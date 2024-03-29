/**
 * 跳转到登录页组件
 */
import Vue from "vue";
import { clearLocalUser } from '@/utils/session'

const vue = new Vue();

// 跳转到登录页
export const goLogin = () => {
  clearLocalUser();
  const backUrl = window.location.href;
  const loginUrl = `${window.location.origin}/#/login${
    backUrl === "#/" || backUrl === "#/home"
      ? ""
      : "?backUrl=" + encodeURIComponent(backUrl)
    }`;
  if (backUrl === "#/") {
    // 如果是直接打开主页，并且未登录，则直接跳转
    window.location.replace(loginUrl);
    if(window.event) {
      window.event.returnvalue = false
    }
    return;
  }
  vue.$dialog({
    title: "提醒",
    content: "登录已过期，请重新登录",
    okBtnTxt: "立即登录",
    onOkBtn(event) {
      this.close();
      window.location.replace(loginUrl);
      window.event.returnvalue = false;
    },
    onCancelBtn(event) {
    }
  });
  // vue.$Spin.hide();
};
