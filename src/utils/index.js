/* global window */
import classnames from 'classnames'
import lodash from 'lodash'
import config from './config'
import request from './request'
import { color } from './theme'

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 *  判断传入参数的类型，以字符串的形式返回
 *  @obj：数据
 **/
function dataType(obj) {
  if (obj === null) return "Null";
  if (obj === undefined) return "Undefined";
  return Object.prototype.toString.call(obj).slice(8, -1);
};

/*
* 判断传入的对象是否存在
* @obj:对象值
*/
function isObj(obj) {
  if (obj === null || typeof (obj) === 'undefined') return false;
  return true;
}


/**
 * 去掉html的标签
 * @str str:标签字符串
 */
function removeHTMLTag(str) {
  str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
  str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
  str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
  str = str.replace(/&nbsp;/ig, ''); //去掉&nbsp;
  return str;
}

/**
 * 删除数组中某个元素，并且修改下标，返回新数组
 * array数组扩展方法
 */
Array.prototype.del = function (n) {
  if (n < 0) {
    return this;
  } else {
    return this.slice(0, n).concat(this.slice(n + 1, this.length));
  }
};

/**
 * 去除数组中重复元素，返回新数组
 * array数组扩展方法
 */
Array.prototype.distinct = function () {
  var result = [], hash = {};
  for (var i = 0, elem; (elem = this[i]) != null; i++) {
    if (!hash[elem]) {
      result.push(elem);
      hash[elem] = true;
    }
  }
  return result;
};




/**
 *  对象复制（克隆）方法，改变对原对象的引用，生成新对象
 *  复制时包括对象中的属性，方法；
 *  @obj：数据
 **/
function clone(obj) {
  var result = {}, objClass = dataType(obj);
  if (objClass === "Object") {
    result = {};
  } else if (objClass === "Array") {
    result = [];
  } else {
    return obj;
  }
  // 遍历obj对象的每一个属性
  for (var key in obj) {
    var val = obj[key];
    if (dataType(val) === "Object") {
      result[key] = arguments.callee(val);
    } else if (dataType(val) === "Array") {
      result[key] = arguments.callee(val);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};

/*
 * 将数组中的元素相加，求和
 * 注意：1.参数必须是数组或者类似数组的对象
 *       2.数组中的元素必须是数字
 */
function arrayElementSum(a) {
  var total = 0;
  if (dataType(a) === "Array") {
    for (var i = 0; i < a.length; i++) {
      var element = a[i];
      if (!element) continue;
      if (dataType(element) == "Number") {
        total += element;
      } else {
        alert("数组中的元素必须是数字");
      }
    }
  } else {
    alert("参数必须是数组或者类似数组的对象");
  }
  return total;
}

/**
* 比较两个日期字符串（YYYY/MM型）
* date1=date2则返回0 , date1>date2则返回1 , date1<date2则返回-1
* @date1:日期
* @date2:日期
* auth:JYX8 time:2017.06.26
**/
function compareData(date1, date2) {
  var strValue1 = date1.split("/");
  var date1Temp = new Date(strValue1[0], parseInt(strValue1[1], 10) - 1, 1);

  var strValue2 = date2.split("/");
  var date2Temp = new Date(strValue2[0], parseInt(strValue2[1], 10) - 1, 1);

  if (date1Temp.getTime() == date2Temp.getTime())
    return 0;
  else if (date1Temp.getTime() > date2Temp.getTime())
    return 1;
  else
    return -1;
}



/**
 * 按id(或某个参数名称)对数组中的元素进行归类，参数值相同的对象放在一起，以数组第一个元素为准
 * array:数组
 * auth:JYX8 time:2016.07.13
 * */
function questionTypeSort(array) {
  var temp_array = array, return_array = [];
  if (dataType(array) === "Array") {
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < temp_array.length;) {
        if (temp_array[j].id == array[i].id) {
          return_array.push(temp_array[j]);
          temp_array = temp_array.del(j);
          j = 0;
        } else {
          j++;
        }
      }
    }
  }
  return return_array;
};

/**
 * 通过sessionStorage、localStorage将数据保存到浏览器中存储；
 * @param data：保存的参数value值
 * @param name：保存到浏览器中的key值，获取时候用
 * @param type：保存方式sessionStorage、localStorage
 * @returns {Boolean}：是否保存成功
 * auth:JYX8 time:2016.07.20
 */
function setDataToBrowser(name, data, type) {
  if (data === undefined) return false;
  if (data === null) return false;
  if (type === "sessionStorage" && window.sessionStorage) {
    if (dataType(data) === "Object" || dataType(data) === "Array") {
      window.sessionStorage.setItem(name, JSON.stringify(data));
    } else {
      window.sessionStorage.setItem(name, data);
    }
  } else if (type === "localStorage" && window.localStorage) {
    if (dataType(data) === "Object" || dataType(data) === "Array") {
      window.localStorage.setItem(name, JSON.stringify(data));
    } else {
      window.localStorage.setItem(name, data);
    }
  }
  return true;
}

/**
 * 获取浏览器sessionStorage、localStorage中存储的数据
 * @param name：保存到浏览器中的名称key值
 * @param type：保存方式sessionStorage、localStorage
 * @returns {String}：返回数据；
 * auth:JYX8 time:2016.07.20
 */
function getDataFromBrowser(name, type) {
  var param = "";
  if (name === undefined) return param;
  if (name === null) return param;
  if (type === "sessionStorage" && window.sessionStorage) {
    param = window.sessionStorage.getItem(name);
  } else if (type === "localStorage" && window.localStorage) {
    param = window.localStorage.getItem(name);
  }
  return param;
}

/**
 * 动态替换css主题样式文件；
 * @param title：替换的css样式文件名称及路径
 * auth:JYX8 time:2016.07.28
 */
function setStyleSheet(title) {
  // 找到head
  var doc_head = document.head;
  // 找到所有的link标签
  var link_list = document.getElementsByTagName("link");
  if (link_list) {
    for (var i = 0; i < link_list.length; i++) {
      // 找到我们需要替换的link，
      // 一般情况下有些样式是公共样式，我们可以写到功能样式文件中，不用来做替换；
      // 这样可以避免每次替换的时候样式文件都很大；可以节省加载速度；
      // ty="theme"，用来做标示，标示我要替换掉的css文件
      if (link_list[i].getAttribute("ty") === "theme") {
        // 找到后将这个link标签重head中移除
        doc_head.removeChild(link_list[i]);
      }
    }
  }
  // 创建一个新link标签
  var link_style = document.createElement("link");
  // 对link标签中的属性赋值
  link_style.setAttribute("rel", "stylesheet");
  link_style.setAttribute("type", "text/css");
  link_style.setAttribute("href", title);
  link_style.setAttribute("ty", "theme");
  // 加载到head中最后的位置
  doc_head.appendChild(link_style);
};

/**
* 处理对象参数值，排除对象参数值为”“、null、undefined，并返回一个新对象
* @obj：需要处理的参数值
**/
function dealObjectValue(obj) {
  var param = {};
  if (obj === null || obj === undefined || obj === "") return param;
  for (var key in obj) {
    // 判断是否是Object对象 
    if (dataType(obj[key]) === "Object") {
      param[key] = dealObjectValue(obj[key]);
    } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      param[key] = obj[key];
    }
  }
  return param;
};

//获取url的参数
function getUrlParameter() {
  var url_search = window.location.search;
  var param = {};
  //获取路径“?”后的参数列表部分
  if (url_search.indexOf("?") != -1) {
    var str = url_search.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      // 将URL参数名称和值以对象形式保存
      param[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return param;
}

export {
  config,
  request,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  dataType,
  isObj,
  removeHTMLTag,
  dealObjectValue,
  clone,
  arrayElementSum,
  compareData,
  questionTypeSort,
  setDataToBrowser,
  getDataFromBrowser,
  setStyleSheet,
  getUrlParameter
}
