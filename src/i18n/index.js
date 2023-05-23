import { createI18n } from 'vue-i18n';

export function loadLang() {
  const context = import.meta.globEager('./lang/*.js');
  const messages = {};

  const langs = Object.keys(context);
  for (const key of langs) {
    if (key === './index.js') return;
    const { lang } = context[key];
    const name = key.replace(/(\.\/lang\/|\.js)/g, '');

    messages[name] = lang;
  }

  return messages;
}
// 获取url中的指定参数对应的值
export function getQueryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}
export const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: getQueryString('lang') || 'kh',
  fallbackLocale: getQueryString('lang') || 'kh',
  messages: loadLang(),
});

export const i18nt = i18n.global.t;

export function setLang(locale) {
  i18n.global.locale = locale;
}
