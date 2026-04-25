import { createApp } from "vue";
import { createPinia } from "pinia";
import { useUsersStore } from "./stores/usersStore";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

const userStore = useUsersStore();
userStore.init();

app.mount("#app");
