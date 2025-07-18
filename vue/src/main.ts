import { createApp } from 'vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import App from './App.vue'

const pinia = createPinia().use(piniaPluginPersistedstate);

createApp(App).use(pinia).mount('#app')
