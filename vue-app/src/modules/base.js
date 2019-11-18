import { BASE } from "../constants";
const LOGIN = `${BASE}login`;
const LOGOUT = `${BASE}logout`;
const GETDESKLIST = `${BASE}cash/desk/list`;

export default {
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        login(context, params) {
            console.log("login cordova", cordova);
            console.log("login window.cordova", window.cordova);
            cordova.plugin.http.post(LOGIN, params, {}, res => {
                console.log("login success res", res);
            }, res => {
                console.log("login fail res", res);
            });
        },
        logout(context, params) {
            cordova.plugin.http.get(LOGOUT).then()
        },
        getDeskList(context, params) {
            cordova.plugin.http.get(GETDESKLIST, params, {}, res => {
                console.log("getDeskList res", res);
            }, res => {
                console.log("getDeskList fail res", res);
            })
        }
    }
}