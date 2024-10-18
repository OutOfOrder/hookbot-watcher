<script setup>
import { computed, onUnmounted, ref, watch } from "vue";
import JSONEntry from "./JSONEntry.vue";

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const messages = ref([
  // {
  //   date: new Date(),
  //   message: { "test":"payload" },
  // },
  // {
  //   date: new Date(),
  //   message: { "test":"payload", "larger": { "data": 123 } },
  // },
]);

const wsUrl = computed(() => {
  if (!URL.canParse(props.url)) return null;

  const u = new URL(props.url);
  if (!(u.protocol === 'ws:' || u.protocol === 'wss:')) return null;
  return u;
});

onUnmounted(() => {
  closeSocket();
});

let websocket = null;

function closeSocket() {
  websocket?.close();
  websocket = null;
}

function openSocket(url) {
  closeSocket();
  if (url) {
    websocket = new WebSocket(url);
    websocket.addEventListener('message', async (evt) => {
      const data = await evt.data.text();
      const message = JSON.parse(data);
      messages.value.push({ date: new Date(), message });
    });
  }
}

watch(
  wsUrl,
  (n, _) => {
    openSocket(n);
  },
  { immediate: true },
);
</script>

<template lang="pug">
.box
  template(v-for="(msg, idx) in messages" :key="idx")
    JSONEntry(:date="msg.date" :message="msg.message")
</template>

<style scoped>
</style>