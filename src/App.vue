<script setup>
import { ref } from "vue";
import WebsocketTail from "./components/WebsocketTail.vue";
import { useLocalStorage } from '@vueuse/core';

const url = useLocalStorage('websocketUrl', '');
const wsUrl = ref(null);
if (url.value) {
  wsUrl.value = url.value;
}
const tailRef = ref(null);

function clearTail() {
  tailRef.value.clearTail();
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
      p.control
        a.button.is-secondary(v-if="wsUrl" @click="clearTail") Clear
  WebsocketTail(v-if="wsUrl" ref="tailRef" :url="wsUrl")
</template>

<style scoped>
#main {
  padding: 1rem;
}
</style>
