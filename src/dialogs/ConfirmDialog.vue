<script setup>
import { OButton, OIcon } from '@oruga-ui/oruga-next';
import { computed, nextTick, onMounted, ref } from 'vue';

const props = defineProps({
  message: { type: String, required: true },
  variant: { type: String, default: 'danger' },
  hasIcon: { type: Boolean, default: true },
  icon: { type: String, default: null },
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' },
});

defineEmits(['close']);

const iconByVariant = computed(() => {
  switch (props.variant) {
  case 'info':
    return 'information';
  case 'success':
    return 'check-circle';
  case 'warning':
    return 'alert';
  case 'danger':
    return 'alert-circle';
  default:
    return null;
  }
});

const cancelButton = ref(null);

onMounted(() => {
  nextTick(() => {
    cancelButton.value.$el.focus();
  });
});
</script>

<template lang="pug">
.modal-card
  section.modal-card-body.is-titleless
    .media
      .media-left(v-if="hasIcon")
        OIcon(
          both
          size="large"
          :variant="variant"
          :icon="icon ? icon : iconByVariant"
        )
      .media-content
        //- eslint-disable-next-line vue/no-v-html
        p(v-html="message")
  footer.modal-card-foot
    .buttons
      OButton(
        ref="cancelButton"
        @click="$emit('close', {action: 'cancel', method: 'button'})"
      ) {{ cancelText }}
      OButton(
        :variant="variant"
        @click="$emit('close', {action: 'ok', method: 'button'})"
      ) {{ confirmText }}
</template>

<style scoped>

</style>
