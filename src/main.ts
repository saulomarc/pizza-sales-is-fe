import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Notifications from 'notiwind'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedState)
app.use(pinia)
app.use(router)
app.use(Notifications)

app.mount('#app')
