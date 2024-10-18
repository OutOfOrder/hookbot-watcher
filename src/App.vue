<script setup>
import { ref } from "vue";
import WebsocketTail from "./components/WebsocketTail.vue";
import { useLocalStorage } from '@vueuse/core';

const url = useLocalStorage('websocketUrl', '');
const wsUrl = ref(null);
if (url.value) {
  wsUrl.value = url.value;
}
</script>

<template lang="pug">
#main
  .box
    .field.has-addons
      p.control
        a.button.is-static Websocket URL
      p.control.is-expanded
        input.input(
          v-model="url"
          type="url"
          placeholder="wss://user@hostname/path"
        )
      p.control
        button.button.is-primary(@click="wsUrl = url") Update
      p.control
        a.button.is-static(v-if="wsUrl") Watching...
  WebsocketTail(v-if="wsUrl" :url="wsUrl")
</template>

<style scoped>
#main {
  padding: 1rem;
}
</style>
