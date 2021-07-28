/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

/**
 * 对象转化拼接成url参数
 * @param {Object} queryParameters
 * objectToQueryString({ page: '1', size: '2kg', key: undefined }); '?page=1&size=2kg'
 */
const objectToQueryString = queryParameters =>
  queryParameters
    ? Object.entries(queryParameters).reduce(
        (queryString, [key, value], index) => {
          const symbal = queryString.length ? "&" : "?";
          queryString +=
            typeof value === "string" ? `${symbal}${key}=${value}` : "";
          return queryString;
        },
        ""
      )
    : "";

/**
 * 序列化form数据
 * @param {object} form
 * serializeForm(document.querySelector('#form')); // email=test%40email.com&name=Test%20Name
 */
const serializeForm = form =>
  Array.from(new FormData(form), field =>
    field.map(encodeURIComponent).join("=")
  ).join("&");

/**
 * 获取url参数包括hash模式
 * @param {string} url
 */
const parseQuery = url => {
  const queryObj = {};
  const reg = /[?&]([^=&#]+)=([^&#]*)/g;
  const querys = url.match(reg);
  if (querys) {
    querys.forEach(item => {
      const query = item.split("=");
      const key = query[0].substr(1);
      const value = query[1];
      if (queryObj[key]) {
        queryObj[key] = [].concat(queryObj[key], value);
      } else {
        queryObj[key] = value;
      }
    });
  }
  return queryObj;
};

// 过滤除了img a之外的内容
const filterReg = /<(?!img|a|\/a).*?>/g;
