import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
// @ts-ignore
import VueTheMask from 'vue-the-mask'

import App from './App.vue'
import router from './router'

import './assets/styles.scss'
import './assets/_fonts.scss'

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedState);

app.use(pinia);
app.use(router);
app.use(VueTheMask);

app.mount('#app');
