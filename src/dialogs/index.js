import { useOruga } from '@oruga-ui/oruga-next';

import AlertDialog from '@/dialogs/AlertDialog.vue';
import ConfirmDialog from '@/dialogs/ConfirmDialog.vue';
import PromptDialog from '@/dialogs/PromptDialog.vue';

const oruga = useOruga();

export function openDialog(dialog, props = {}, options = {}) {
  const dialogOptions = dialog.dialogOptions || {};
  return oruga.modal.open({
    component: dialog, canCancel: ['x', 'button'], trapFocus: true, props, ...dialogOptions, ...options,
  }).promise.then((arg) => Array.isArray(arg) ? arg[0] : arg);
}

/**
 * Shows an error message notification
 *
 * @param {string} message The message to display
 * @param {number} duration The duration to leave the message up (in milliseconds)
 * @param {string} position The position of the popup
 */
export function showError({ message, duration = 4000, position = 'bottom' }) {
  return showNotification({
    message, duration, position, variant: 'danger',
  });
}

/**
 * Shows an error message notification
 *
 * @param {string} message The message to display
 * @param {number} duration The duration to leave the message up (in milliseconds)
 * @param {string} position The position of the popup
 */
export function showStatus({ message, duration = 2500, position = 'bottom' }) {
  return showNotification({
    message, duration, position,
  });
}

export function showNotification({
  message,
  duration = 2500, indefinite = false, closable = false,
  variant = 'info', type = variant,
  iconSize = 'normal', position = 'bottom',
}) {
  const notification = oruga.notification.open({
    message,
    duration, indefinite, closable,
    variant, type,
    iconSize, position,
    rootClass: 'toast-notification',
  });
  notification.promise.close = notification.close;
  return notification.promise;
}

/**
 * @param {Object} options
 * @param {string} options.message The message to display
 * @param {string} options.variant The variant to use, Default danger
 * @param {boolean} options.hasIcon Show an icon in the dialog. Default true
 * @param {string} options.icon The icon to show. Default is based on the variant
 * @param {string} options.confirmText The text for the confirm button. Default Confirm
 * @param {string} options.cancelText The text for the cancel button. Default Cancel
 * @returns {Promise<any>}
 */
export function confirm(options) {
  return openDialog(ConfirmDialog, options);
}

/**
 * @param {object} options
 * @param {string} options.message The message to display
 * @param {string} options.variant The variant to use, Default danger
 * @param {string} options.hasIcon Show an icon in the dialog. Default true
 * @param {string} options.icon The icon to show. Default is based on the variant
 * @param {string} options.okText The text for the ok button. Default Ok
 * @returns {Promise<any>}
 */
export function alert(options) {
  return openDialog(AlertDialog, options);
}

/**
 * @param {object} options
 * @param {string} options.message The message to display
 * @param {string} options.variant The variant to use, Default question
 * @param {string} options.hasIcon Show an icon in the dialog. Default true
 * @param {string} options.icon The icon to show. Default is based on the variant
 * @param {string} options.okText The text for the ok button. Default Ok
 * @returns {Promise<any>}
 */
export function prompt(options) {
  return openDialog(PromptDialog, options);
}
