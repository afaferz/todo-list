import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
import './styles/index.css';

const app = createApp(App);
app.provide('$axios', axios);
app.use(store, key);
app.use(router);
app.mount('#app');
