import axios from "axios";
import Vue from "vue";
import { getLocalUser } from "./session";
import { goLogin } from "./goLogin";

const vue = new Vue();

export default {
  get: (path, params) => {
    const session = getLocalUser();
    if (!session) {
      goLogin();
      return;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(path, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          }, params
        })
        .then(res => {
          if (res.status !== 200) {
            vue.$toast.fail(res.statusText, {
              duration: 3000
            });
            reject(res);
          }
          if (res.data.code !== 0) {
            if (res.data.code === 1) {
              goLogin();
            } else {
              vue.$toast.fail(res.data.msg, {
                duration: 3000
              });
              //需要有响应
              reject(res.data.msg);
            }
          }
          resolve(res);
        })
        .catch(error => {
          reject(error.message);
          vue.$toast.fail(error.message, {
            duration: 3000
          });
        });
    });
  },
  post: (path, params) => {
    const session = getLocalUser();
    if (!session) {
      goLogin();
      return;
    }
    return new Promise((resolve, reject) => {
      axios
        .post(path, params, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          }
        })
        .then(res => {
          if (res.status !== 200) {
            vue.$toast.fail(res.statusText, {
              duration: 3000
            });
            reject(res);
          }
          if (res.data.code !== 0) {
            if (res.data.code === 1) {
              goLogin();
            } else {
              vue.$toast.fail(res.data.msg, {
                duration: 3000
              });
              //需要有响应
              reject(res.data.msg);
            }
          }
          resolve(res);
        })
        .catch(error => {
          reject(error.message);
          vue.$toast.fail(error.message, {
            duration: 3000
          });
        });
    });
  },
  postFormDataBeforeLogin: (path, params) => {
    return new Promise((resolve, reject) => {
      axios
        .post(path, params, {
          transformRequest: [function (data) {
            let ret = Object.keys(data).map(key => {
              return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
            }).join("&");
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(res => {
          if (res.status !== 200) {
            vue.$toast.fail(res.statusText, {
              duration: 3000
            });
            reject(res);
          }
          if (res.data.code !== 0) {
            vue.$toast.fail(res.data.msg, {
              duration: 3000
            });
            //需要有响应
            reject(res.data.msg);
          }
          resolve(res);
        })
        .catch(error => {
          reject(error.message);
          vue.$toast.fail(error.message, {
            duration: 3000
          });
        });
    });
  },
  shareGet: (path, params) => {
    return new Promise((resolve, reject) => {
      axios
        .get(path, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            // VT: session.vt
          },
          params: params
        })
        .then(res => {
          if (res.code === 600 || res.data.code === 600) {
            goLogin();
            reject(res);
          }
          if (res.status !== 200) {
            vue.$toast.fail(res.statusText, {
              duration: 3000
            });
            reject(res);
          }
          if (res.data.code === 0 ||
            (res.data.code && res.data.code !== 200) &&
            (res.data.code && res.data.code !== 600)) {
            if (res.data.code === 403) {
              vue.$toast.warn(res.data.msg, {
                duration: 3000
              })
            } else {
              vue.$toast.fail(res.data.resMsg || res.data.msg, {
                duration: 3000
              });
            }
            //需要有响应
            reject(res);
          }
          resolve(res);
        })
        .catch(error => {

          reject(error.message);
          vue.$toast.fail(error.message, {
            duration: 3000
          });
        });
    });
  },
  sharePost: (path, params) => {
    return new Promise((resolve, reject) => {
      axios
        .post(path, params, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            // VT: session.vt
          }
        })
        .then(res => {
          if (res.code === 600 || res.data.code === 600) {
            goLogin();
            reject(res);
          }
          if (res.status !== 200) {
            vue.$toast.fail(res.statusText, {
              duration: 3000
            });
            reject(res);
          }
          if (res.data.code === 0 ||
            (res.data.code && res.data.code !== 200) &&
            (res.data.code && res.data.code !== 600)) {
            if (res.data.code === 403) {
              vue.$toast.warn(res.data.msg, {
                duration: 3000
              })
            } else {
              vue.$toast.fail(res.data.resMsg || res.data.msg, {
                duration: 3000
              });
            }
            //需要有响应
            reject(res);
          }
          resolve(res);
        })
        .catch(error => {
          reject(error.message);
          vue.$toast.fail(error.message, {
            duration: 3000
          });
        });
    });
  }
};
