<script setup>
import { computed, ref } from "vue";
import 'highlight.js/styles/intellij-light.css';
import hljs from 'highlight.js/lib/core';
import jsonLang from 'highlight.js/lib/languages/json';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import { OButton, useOruga } from "@oruga-ui/oruga-next";

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
.entry(@click="full = !full")
  small
    | {{ date?.toJSON() }}
    |
    OButton(size="small" @click.stop="copyToClipboard") Copy
  HighlightJS(language="json" :code="json")
</template>

<style scoped lang="scss">
.entry {
  border-bottom: 1px solid lightgray;
  margin-bottom: 2px;

  small {
    border-left: 2px solid lightgreen;
    padding-left: 1ex;
  }

  pre {
    padding: 0;
    border-left: 1rem solid lightgreen;
  }
}
</style>