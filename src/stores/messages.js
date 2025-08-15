import { DateTime } from "luxon";

import { defineStore } from "pinia";
import { ref, watch } from "vue";

import { uuidv4 } from "@/utils.js";

function buildFakeMessages() {
  return [{
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Wed Jun 25 2025 21:39:17 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-25T21:39:17.821",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "3173998030",
        "DNIS": "3178132168",
        "SkillName": "Non-Tupps Procedure Help",
        "SkillID": "14319452",
        "AgentID": "25405827",
        "ContactID": "676950702758",
        "MasterID": "676950702758",
        "eventTime": "2025-06-26T01:39:17.507Z",
        "event": "AgentAnswer",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Wed Jun 25 2025 21:40:30 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-25T21:40:30.157",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "3173998030",
        "DNIS": "3178132168",
        "SkillName": "Non-Tupps Procedure Help",
        "SkillID": "14319452",
        "AgentID": "25405827",
        "ContactID": "676950702758",
        "MasterID": "676950702758",
        "eventTime": "2025-06-26T01:40:30.284Z",
        "event": "AgentDisconnect",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 07:21:21 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T07:21:21.760",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "7657496997",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676950810720",
        "MasterID": "676950810720",
        "eventTime": "2025-06-26T11:21:21.275Z",
        "event": "AgentAnswer",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 07:21:54 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T07:21:54.938",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "7657496997",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676950810720",
        "MasterID": "676950810720",
        "eventTime": "2025-06-26T11:21:54.891Z",
        "event": "AgentDisconnect",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 07:26:10 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T07:26:10.742",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "8125250903",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676950812098",
        "MasterID": "676950812098",
        "eventTime": "2025-06-26T11:26:10.583Z",
        "event": "AgentAnswer",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 07:27:53 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T07:27:53.448",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "8125250903",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676950812098",
        "MasterID": "676950812098",
        "eventTime": "2025-06-26T11:27:53.259Z",
        "event": "AgentDisconnect",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 08:05:59 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T08:05:59.455",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "3179376749",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676950826634",
        "MasterID": "676950826634",
        "eventTime": "2025-06-26T12:05:59.192Z",
        "event": "AgentAnswer",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 08:06:26 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T08:06:26.365",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "3179376749",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676950826634",
        "MasterID": "676950826634",
        "eventTime": "2025-06-26T12:06:26.22Z",
        "event": "AgentDisconnect",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 08:08:26 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T08:08:26.117",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "8127988393",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676950827978",
        "MasterID": "676950827978",
        "eventTime": "2025-06-26T12:08:25.848Z",
        "event": "AgentAnswer",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 08:09:02 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T08:09:02.668",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "8127988393",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676950827978",
        "MasterID": "676950827978",
        "eventTime": "2025-06-26T12:09:02.504Z",
        "event": "AgentDisconnect",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 08:56:55 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T08:56:55.778",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "7708953967",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676950863845",
        "MasterID": "676950863845",
        "eventTime": "2025-06-26T12:56:55.527Z",
        "event": "AgentAnswer",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 08:57:37 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T08:57:37.623",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "7708953967",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676950863845",
        "MasterID": "676950863845",
        "eventTime": "2025-06-26T12:57:37.577Z",
        "event": "AgentDisconnect",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 11:14:43 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T11:14:43.258",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "7069960150",
        "DNIS": "3178132168",
        "SkillName": "Tupps Procedure Help",
        "SkillID": "11391591",
        "AgentID": "25405827",
        "ContactID": "676951059890",
        "MasterID": "676951059890",
        "eventTime": "2025-06-26T15:14:43.197Z",
        "event": "AgentAnswer",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 11:16:44 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T11:16:44.286",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "7069960150",
        "DNIS": "3178132168",
        "SkillName": "Tupps Procedure Help",
        "SkillID": "11391591",
        "AgentID": "25405827",
        "ContactID": "676951059890",
        "MasterID": "676951059890",
        "eventTime": "2025-06-26T15:16:44.28Z",
        "event": "AgentDisconnect",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 11:41:22 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T11:41:22.392",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "7657496997",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676951103450",
        "MasterID": "676951103450",
        "eventTime": "2025-06-26T15:41:22.363Z",
        "event": "AgentAnswer",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 11:41:47 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T11:41:47.396",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "7657496997",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676951103450",
        "MasterID": "676951103450",
        "eventTime": "2025-06-26T15:41:47.497Z",
        "event": "AgentDisconnect",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 11:51:05 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T11:51:05.142",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "8668476721",
        "DNIS": "3178132168",
        "SkillName": "NEST",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676951118949",
        "MasterID": "676951118949",
        "eventTime": "2025-06-26T15:51:05.108Z",
        "event": "AgentAnswer",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 11:53:30 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T11:53:30.407",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "8668476721",
        "DNIS": "3178132168",
        "SkillName": "NEST",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676951118949",
        "MasterID": "676951118949",
        "eventTime": "2025-06-26T15:53:30.371Z",
        "event": "AgentDisconnect",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 12:02:54 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T12:02:54.813",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "8625685300",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676951137744",
        "MasterID": "676951137744",
        "eventTime": "2025-06-26T16:02:54.759Z",
        "event": "AgentAnswer",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 12:03:24 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T12:03:24.166",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "8625685300",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676951137744",
        "MasterID": "676951137744",
        "eventTime": "2025-06-26T16:03:24.24Z",
        "event": "AgentDisconnect",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 12:47:11 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T12:47:11.023",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "7657496997",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676951207451",
        "MasterID": "676951207451",
        "eventTime": "2025-06-26T16:47:10.856Z",
        "event": "AgentAnswer",
        "source": "NICE",
      }],
    },
  }, {
    "date": {
      "_custom": {
        "type": "date",
        "displayText": "Thu Jun 26 2025 12:47:41 GMT-0400 (Eastern Daylight Time)",
        "value": "2025-06-26T12:47:41.223",
      },
    },
    "message": {
      "method": "phone.logstate",
      "id": "fubar",
      "params": [{
        "FirstName": "Netfor",
        "LastName": "Black",
        "ANI": "7657496997",
        "DNIS": "3178132168",
        "SkillName": "Nest",
        "SkillID": "11391130",
        "AgentID": "25405827",
        "ContactID": "676951207451",
        "MasterID": "676951207451",
        "eventTime": "2025-06-26T16:47:41.256Z",
        "event": "AgentDisconnect",
        "source": "NICE",
      }],
    },
  }].map((item) => ({
    date: DateTime.fromISO(item.date),
    message: item.message,
  }));
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