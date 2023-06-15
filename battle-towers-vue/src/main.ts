import './assets/scss/main.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import VueAudio from 'vue-audio';

const app = createApp(App);

app.use(createPinia());

app.component('VueAudio', VueAudio);

app.mount('#app');