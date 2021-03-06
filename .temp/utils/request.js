import Taro, { request as _request, showToast as _showToast } from "@tarojs/taro-h5";
import { baseUrl, noConsole } from "../config/index";

const parseJSON = response => {
  const dataString = JSON.stringify(response);
  const dataObj = JSON.parse(dataString, (k, v) => {
    if (v === null) {
      return undefined;
    }
    return v;
  });
  return dataObj;
};

const request_data = {
  platform: 'wap',
  rent_mode: 2
};

export default ((options = { method: 'GET', data: {} }) => {
  if (!noConsole) {
    console.log(`${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(options.data)}`);
  }
  return _request({
    url: baseUrl + options.url,
    data: {
      ...request_data,
      ...options.data
    },
    header: {
      'Content-Type': 'application/json'
    },
    method: options.method.toUpperCase()
  }).then(res => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`, res.data);
      }
      if (data.status !== 'ok') {
        _showToast({
          title: `${res.data.error.message}~` || res.data.error.code,
          icon: 'none',
          mask: true
        });
      }

      return parseJSON(data);
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  });
});