<script setup>
import { useLocalStorage } from '@vueuse/core';

import { computed } from "vue";

import URLEditor from "@/components/URLEditor.vue";
import WebsocketTail from "@/components/WebsocketTail.vue";
import { useSessionStore } from "@/stores/session.js";

const sessionStore = useSessionStore();

const selected = computed({
  get: () => sessionStore.findRecord(sessionStore.currentUrlId),
  set: (url) => {
    sessionStore.currentUrlId = url.id;
  },
});

const wsUrl = computed(() => selected.value?.url);
</script>

<template lang="pug">
#main
  URLEditor(v-model="selected")
  WebsocketTail(v-if="wsUrl" :url="wsUrl")
</template>

<style scoped>
#main {
  padding: 1rem;
}
</style>
