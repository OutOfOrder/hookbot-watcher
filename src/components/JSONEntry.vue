<script setup>
import { computed, ref } from "vue";
import 'highlight.js/styles/a11y-light.css';
import hljs from 'highlight.js/lib/core';
import jsonLang from 'highlight.js/lib/languages/json.js';
import hljsVuePlugin from "@highlightjs/vue-plugin";

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

</script>

<template lang="pug">
.entry(@click="full = !full")
  small {{ date?.toJSON() }}
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