import { Modal, Notification, OrugaConfig } from "@oruga-ui/oruga-next";
import { bulmaConfig } from '@oruga-ui/theme-bulma';
import { createPinia } from "pinia";
import { createApp } from 'vue';

import App from './App.vue';
import '@oruga-ui/theme-bulma/dist/bulma.css';

createApp(App)
  .use(OrugaConfig, bulmaConfig)
  .use(Modal)
  .use(Notification)
  .use(createPinia())
  .mount('#app');
