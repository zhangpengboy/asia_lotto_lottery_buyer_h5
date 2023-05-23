import axios from 'axios';
import lance from '@/utils/lance';
import { Toast } from 'vant';

// 后端返回码国际化配置
const language = lance.Language();
const langue = lance.LanguageCustomize();
// 默认header
axios.defaults.headers['Accept-Language'] = language;
axios.defaults.headers['Content-Type'] = import.meta.env.VITE_APP_REQUEST_DATA_ENCRYPTION === 1 ? 'text/plain;charset=UTF-8' : 'application/json';
axios.defaults.headers.sid = '20201127001100000abcd';
axios.defaults.headers.appId = 'web';
axios.defaults.headers.langue = langue;
axios.defaults.headers.encrypt = import.meta.env.VITE_APP_REQUEST_DATA_ENCRYPTION;
axios.defaults.headers.clientType = 'web'; // 终端类型
axios.defaults.headers.ip = sessionStorage.getItem('ip') || '0.0.0.0'; // ip
axios.defaults.headers.deviceId = ''; // 设备id，设备唯一标识
axios.defaults.headers.networkType = '1'; // unknow 、wifi、5G、4G、3G、2G
axios.defaults.headers.model = ''; // 设备的型号
axios.defaults.headers.osSystem = ''; // 操作系统（包含版本号）
axios.defaults.headers.imei = ''; // 设备的国际移动设备身份码
axios.defaults.headers.imsi = ''; // 设备的国际移动用户识别码
axios.defaults.headers.vendor = ''; // 设备的生产厂商
axios.defaults.headers.longitude = ''; // 经度
axios.defaults.headers.latitude = ''; // 纬度
axios.defaults.headers.versionName = 'eg1.0.0'; //
axios.defaults.headers.versionCode = 'eg100000'; //
axios.defaults.headers.userNo = lance.getData('userId'); // 用户id
// 创建请求实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_PROXY_DOMAIN_REAL,
  // 指定请求超时的毫秒数
  timeout: 20000,
  // 表示跨域请求时是否需要使用凭证
  withCredentials: false,
});

// 前置拦截器（发起请求之前的拦截）
instance.interceptors.request.use(
  (config) => {
    /**
     * 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
     */
    const token = lance.getJson('token');
    if (token) {
      // let each request carry token
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 后置拦截器（获取到响应时的拦截）
instance.interceptors.response.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     */
    const res = response.data;
    console.log('res', res);

    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      Toast(res.msg);
      // 412: Token expired;
      if (res.code === 412) {
        store.dispatch('user/userLogout');
      }
      return Promise.reject(res.msg || 'Error');
    } else {
      return res;
    }
  },
  (error) => {
    const { response } = error;
    if (response && response.data) {
      return Promise.reject(error);
    }
    const { message } = error;
    console.error(message);
    return Promise.reject(error);
  },
);

// 导出常用函数

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export const post = (url, data = {}, params = {}) => {
  return instance({
    method: 'post',
    url,
    data,
    params,
  });
};

/**
 * @param {string} url
 * @param {object} params
 */
export const get = (url, params = {}) => {
  return instance({
    method: 'get',
    url,
    params,
  });
};

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export const put = (url, data = {}, params = {}) => {
  return instance({
    method: 'put',
    url,
    params,
    data,
  });
};

/**
 * @param {string} url
 * @param {object} params
 */
export const _delete = (url, params = {}) => {
  return instance({
    method: 'delete',
    url,
    params,
  });
};

export default instance;
