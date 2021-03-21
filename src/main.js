import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import { firestorePlugin } from "vuefire";
import Notifications from "vue-notification";

Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(firestorePlugin);

new Vue({
	render: (h) => h(App),
}).$mount("#app");
