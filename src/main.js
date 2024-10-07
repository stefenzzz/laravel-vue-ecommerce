import './assets/main.css'

import { createApp, markRaw } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import currencyUSD from './filters/currency.js'

const app = createApp(App)
const pinia = createPinia();

pinia.use(({store})=>{
    store.router = markRaw(router);
});


app.use(router)
app.use(pinia);


app.mount('#app')

app.config.globalProperties.$filters = {
    currencyUSD
}
