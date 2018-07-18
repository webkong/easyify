import Vue from "vue";
import "Utils/common";
import App from "./index.vue";

let vm = new Vue({
    el: "#App",
    render: h => h(App)
});

console.log(vm);