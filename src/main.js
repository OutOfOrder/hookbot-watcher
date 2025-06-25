import { createApp } from 'vue';
import App from './App.vue';
import { OrugaConfig, Notification } from "@oruga-ui/oruga-next";
import { bulmaConfig } from '@oruga-ui/theme-bulma';
import '@oruga-ui/theme-bulma/dist/bulma.css';

createApp(App)
  .use(OrugaConfig, bulmaConfig)
  .use(Notification)
  .mount('#app');
