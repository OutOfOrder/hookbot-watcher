import { DateTime } from "luxon";

import { defineStore } from "pinia";
import { ref, watch } from "vue";

import { randomChoice, uuidv4 } from "@/utils.js";

const EVENT_TYPES = [
  "ticket.create", "ticket.update",
  "task.create", "task.acknowledge", "task.resolve",
];

function generateFakeMessages(numEvents, hour) {
  const events = [];

  for (let i = 0; i < numEvents; i++) {
    let seconds = Math.random() * 3600;

    let time = hour.plus({ seconds });

    events.push({
      "id": uuidv4(),
      "date": time,
      "message": {
        "event": randomChoice(EVENT_TYPES),
        "event_at": time.toISO(),
        "source": "SMP",
        "ticket": {
          "CallID": "06436403",
          "ChangedFields": [],
          "CompanyID": "UPS",
        },
      },
    });
  }

  return events;
}

function _buildFakeMessages(maxNumEvents = 10, hours = 24) {

  const events = [];
  const start_time = DateTime.now().minus({ hours });
  for (let i = 0; i < hours; i++) {
    let eventCount = Math.floor(Math.random() * maxNumEvents);

    events.push(...generateFakeMessages(eventCount, start_time.plus({ hours: i })));
  }

  events.sort((a, b) => b.date.toMillis() - a.date.toMillis());

  return events;
}

export const useMessageStore = defineStore('messages', () => {
  const messages = ref([]);
  const websocketUrl = ref(null);
  const maxHistoryLines = ref(1000);

  function addMessage(message) {
    const date = DateTime.now();
    const id = uuidv4();
    messages.value.unshift({
      id,
      date,
      message,
    });
    if (messages.value.length > maxHistoryLines.value) {
      messages.value.length = maxHistoryLines.value;
    }
  }

  function switchUrl(wsUrl) {
    websocketUrl.value = wsUrl;
  }

  watch(
    websocketUrl,
    (newUrl, oldUrl) => {
      if (newUrl === oldUrl) {
        return;
      }
      closeSocket();
      clearTail();
      if (newUrl) {
        openSocket(newUrl);
      }
    },
  );

  function clearTail() {
    messages.value = [];
    // messages.value = _buildFakeMessages();
  }

  let websocket = null;

  function closeSocket() {
    websocket?.close();
    websocket = null;
  }

  async function handleMessage(evt) {
    const data = await evt.data.text();
    let message = data;
    try {
      message = JSON.parse(data);
    } catch (ex) {
      console.error("Error parsing message", ex);
    }
    addMessage(message);
  }

  function openSocket(url) {
    if (!url) {
      console.debug('No websocket url provided');
      return;
    }

    console.debug("Opening websocket", url);
    websocket = new WebSocket(url);
    websocket.addEventListener('message', handleMessage);
  }

  return {
    messages,
    websocketUrl,
    addMessage,
    switchUrl,
    clearTail,
  };
});