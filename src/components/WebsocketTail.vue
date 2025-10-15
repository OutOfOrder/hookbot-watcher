<script setup>

import { OButton, OField, OInput } from "@oruga-ui/oruga-next";
import { vElementBounding } from "@vueuse/components";
import { refDebounced } from "@vueuse/core";
import { Sparkline } from 'sparkline-vue';
import { computed, nextTick, ref, shallowRef, watch } from "vue";

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
const filterThrottled = refDebounced(filter, 500);

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

const timeLineData = ref([]);

watch(
  messages,
  () => {
    const raw_data = Map.groupBy(messages.value, ({ date }) => {
      // move to every 15 minutes
      return Math.round(date.startOf('minute').toSeconds() / 60 / 15);
    }).entries()
      .map(([key, value]) => [key, value.length])
      .toArray()
      .toSorted((a, b) => a[0] - b[0]);
    if (raw_data.length === 0) {
      raw_data.unshift([0, 0]);
    } else if (raw_data.length === 1) {
      raw_data.unshift([raw_data[0][0] - 1, 0]);
    }

    const data = [];

    let last_date = raw_data[0][0];
    for (const entry of raw_data) {
      while ((entry[0] - last_date) > 1) {
        data.push(0);
        last_date++;
      }

      data.push(entry[1]);
    }
    timeLineData.value = data;
  },
  { immediate: true, deep: true },
);

const graphWidth = ref(100);

async function onResizeGraph({ width }) {
  console.log('rezize', width.value);
  graphWidth.value = width.value;
  const oldValue = timeLineData.value;
  timeLineData.value = [];
  await nextTick();
  timeLineData.value = oldValue;
}

const graphResizeOptions = {
  immediate: true,
  updateTiming: 'next-frame',
};

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

  div(v-element-bounding="[onResizeGraph, graphResizeOptions]")
    Sparkline(:data="timeLineData" :width="graphWidth")

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
