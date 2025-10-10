<script setup>
import { OButton, OField, OInput } from '@oruga-ui/oruga-next';
import { computed, ref, watch } from 'vue';

import { confirm, showError } from "@/dialogs/index.js";
import { useSessionStore } from "@/stores/session.js";

const props = defineProps({
  record: { type: Object, required: true },
  existing: { type: Boolean, default: false },
});

const editingRecord = ref({});

const title = computed(() => {
  return props.record.id ? 'Edit URL' : 'Add URL';
});

const sessionStore = useSessionStore();

watch(
  () => props.record,
  () => editingRecord.value = { name: '', url: '', ...props.record },
  { immediate: true },
);

const emit = defineEmits(['close']);

function cancel() {
  emit('close', { action: 'cancel', method: 'button' });
}

function saveRecord() {
  if (editingRecord.value.name && editingRecord.value.url) {
    sessionStore.save(editingRecord.value);
    emit('close', { action: 'ok', method: 'button', record: editingRecord.value });
    // TODO saving
  } else {
    showError({ message: 'Please enter a name and URL' });
  }
}

async function deleteRecord() {
  const resp = await confirm({ message: 'Really delete this URL?' });
  if (resp.action === 'ok') {
    sessionStore.remove(editingRecord.value.id);
    emit('close', { action: 'ok', method: 'button', record: editingRecord.value });
  }
}
</script>

<template lang="pug">
  .modal-card
    header.modal-card-head
      p.modal-card-title {{ title }}
    section.modal-card-body
      OField(label="Name")
        OInput(v-model.trim="editingRecord.name" expanded required)
      OField(label="URL")
        OInput(
          v-model.trim="editingRecord.url"
          expanded
          type="url"
          required
          placeholder="wss://hostname/path?token=blah")

    footer.modal-card-foot
      .buttons
        OButton(
          @click="cancel"
        ) Cancel
        OButton(
          variant="primary"
          @click="saveRecord"
        ) Save
        .is-right(v-if="existing")
          OButton(variant="danger" @click="deleteRecord") Delete
</template>

<style scoped>

</style>
