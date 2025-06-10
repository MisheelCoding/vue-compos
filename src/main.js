import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

// nordplay1.com;
// pengelab.com;
// nextnorge.com;
// heledeg.com;
// tidforspill.com;
// veien1.com;
// tudasyda1.ru;
// D6Zona.ru;
// prosebja.ru;
// Startolog.ru;
// bablopro.ru;
// Turnirka01.ru;
// skillzlab.ru;
// Brain4Bank.com;
// PlayArena01.com;
// Fundology1.com;
// Growlyticsss.com;
// Grow-Within.com;
// Deck-And-Dice.com;
// EcoVoyageur1.com;
