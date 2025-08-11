<script setup>
import 'highlight.js/styles/intellij-light.css';
import hljs from 'highlight.js/lib/core';
import jsonLang from 'highlight.js/lib/languages/json';

import hljsVuePlugin from "@highlightjs/vue-plugin";
import { OButton, OField, useOruga } from "@oruga-ui/oruga-next";
import { computed, ref } from "vue";

hljs.registerLanguage('json', jsonLang);

const HighlightJS = hljsVuePlugin.component;

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
  date: {
    type:Date,
    required: true,
  },
});

const full = ref(false);

const expandText = computed(() => full.value ? 'Collapse' : 'Expand');

const json = computed(() => {
  if (full.value) {
    return JSON.stringify(props.message, null, 2);
  } else {
    return JSON.stringify(props.message);
  }
});

function copyToClipboard() {
  navigator.clipboard.writeText(JSON.stringify(props.message, null, 2));

  useOruga().notification.open({
    message: "Copied to clipboard",
    variant: 'info',
    position: 'bottom',
    queue: true,
  });
}

</script>

<template lang="pug">
.entry
  small(@click="full = !full")
    | {{ date?.toJSON() }}
    |
    OField.is-inline(addons)
      OButton(size="small" rounded @click.stop="copyToClipboard") Copy
      OButton(size="small" rounded) {{ expandText }}
  HighlightJS(language="json" :code="json")
</template>

<style scoped lang="scss">
.entry {
  border-bottom: 1px solid lightgray;
  margin-bottom: 2px;

  small {
    border-left: 2px solid lightgreen;
    padding-left: 1ex;

    .field.is-inline > :deep(.field-body) {
      display: inline-flex;
    }
  }

  pre {
    padding: 0;
    border-left: 1rem solid lightgreen;
  }
}
</style>