import fetch from 'dva/fetch';


const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errText = codeMessage[response.status] || response.statusText;
  const error = new Error(errText);
  error.name = response.status;
  error.response = response;
  throw error;
}

function checkSuccess(data) {
  if (data.success) {
    return data;
  }
  const error = new Error(data.message);
  throw error;
}


function decorate(url, options) {
  const defaultOptions = {
    headers: {},
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      newOptions.headers = {
        ...newOptions.headers,
      };
    }
  } else if (newOptions.method === 'GET') {
    const params = newOptions.params;
    if (params) {
      let paramsArray = [];
      //拼接参数  
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
  }
  return { newUrl: url, newOptions };
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, options) {
  const { newUrl, newOptions } = decorate(url, options);
  newOptions.headers.Accept = 'application/json';
  console.log('fetch url:' + newUrl);
  return fetch(newUrl, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkSuccess)
    .then(data => {
      return data;
    });
}

export function download(url, options) {
  const { newUrl } = decorate(url, options);
  window.location.href = newUrl;
}

