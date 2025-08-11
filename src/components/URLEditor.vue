<script setup>
import { OButton, OField, OSelect } from "@oruga-ui/oruga-next";
import { computed } from "vue";

import { openDialog } from "@/dialogs";
import EditUrlDialog from "@/dialogs/EditUrlDialog.vue";
import { useSessionStore } from "@/stores/session.js";

const selected = defineModel({ type: Object });

const sessionStore = useSessionStore();

async function addUrl() {
  await openDialog(EditUrlDialog, { record: { } });
}

async function editUrl() {
  await openDialog(EditUrlDialog, { record: selected.value, existing: true });
}

const entries = computed(() => {
  return sessionStore.urls.map(u => ({ label: u?.name, value: u }));
});
</script>

<template lang="pug">
.box
  OField(addons)
    p.control
      a.button.is-static Websocket URL
    OSelect(
      v-model="selected"
      expanded
      :options="entries"
      open-on-focus
      placeholder="Select a URL to watch")
    OButton(variant="primary" @click="addUrl") Add
    OButton(
      v-if="selected"
      variant="info"
      @click="editUrl") Edit
</template>

<style scoped>

</style>