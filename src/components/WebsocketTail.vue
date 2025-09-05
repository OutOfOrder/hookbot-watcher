<script setup>
import { refThrottled } from "@vueuse/core";

import { OButton, OField, OInput } from "@oruga-ui/oruga-next";
import { computed, ref, shallowRef, watch } from "vue";

import JSONEntry from "@/components/JSONEntry.vue";
import { useMessageStore } from "@/stores/messages.js";


const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const messageStore = useMessageStore();

const filter = shallowRef(null);
const filterThrottled = refThrottled(filter, 100, true, false);

const messages = computed(() => {
  if (filterThrottled.value) {
    return messageStore.messages.filter(m => JSON.stringify(m.message).includes(filterThrottled.value));
  } else {
    return messageStore.messages;
  }
});

const wsUrl = computed(() => {
  if (!URL.canParse(props.url)) return null;

  const u = new URL(props.url);
  if (!(u.protocol === 'ws:' || u.protocol === 'wss:')) return null;
  return u;
});

watch(
  wsUrl,
  () => messageStore.switchUrl(wsUrl.value),
  { immediate: true },
);

</script>

<template lang="pug">
  .box
    OField(addons)
      p.control
        a.button.is-static Watching
      OInput(:model-value="wsUrl" expanded readonly)
      OButton(size="small" variant="info" @click="messageStore.clearTail" ) Clear
    OField(addons)
      p.control
        a.button.is-static Filter
      OInput(v-model="filter" expanded placeholder="Filter message contents")

  TransitionGroup.box(name="messages" tag="div")
    JSONEntry(
      v-for="msg in messages"
      :key="msg.id"
      :date="msg.date"
      :message="msg.message"
    )
</template>

<style scoped lang="scss">
.messages-enter-active {
  animation: flash 2s ease;
}

@keyframes flash {
  0% {
    background-color: inherit;
  }
  10% {
    background-color: #1cebf3;
  }
  100% {
    background-color: inherit;
  }
}
</style>
