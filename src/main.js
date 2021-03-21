import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import { firestorePlugin } from "vuefire";
import Notifications from "vue-notification";
// import io from "socket.io-client";
// import VueSocketIOExt from "vue-socket.io-extended";

// const socket = io("http://localhost:4000/");
// socket.emit("hello", { a: "b", c: [] });
// socket.on("connect", () => {
// 	console.log(socket.id); // "G5p5..."
// });
// socket.on("test", (data) => {
// 	console.log(data);
// });
// socket.emit("ferret", "tobi", (data) => {
// 	console.log(data); // data will be "woot"
// });
// Vue.use(VueSocketIOExt, socket);
Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(firestorePlugin);

new Vue({
	render: (h) => h(App),
}).$mount("#app");
