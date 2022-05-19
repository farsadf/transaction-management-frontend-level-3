import { createApp } from "vue";
import App from "./App.vue";
import "./assets/base.css";
import store from "./store";

createApp(App).use(store).mount("#app");
