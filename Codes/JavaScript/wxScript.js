/* eslint-disable */
import http from "@hlj/share/Http";
import { getQuery } from "@hlj/share";
import { getAuthorizerIdApi } from "../api";

// 加载Script
export function loadScript(url, callback) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.onload = () => {
    callback && callback();
  };
  script.src = url;
  document.body.appendChild(script);
}

export const wxSdk = "//res.wx.qq.com/open/js/jweixin-1.4.0.js";
/**
 * 加载微信sdk
 */
export function loadWxSdk(callback) {
  if (!window.wx) {
    loadScript(wxSdk, () => {
      callback && callback();
    });
  } else {
    callback && callback();
  }
}

const prefix = {
  dev: "https://dev-api.hunliji.com",
  pre: "https://pre-api.hunliji.com",
  publish: "https://api.hunliji.com"
}[__ENV__ || "publish"];

async function wxConfig() {
  const merchantId = getQuery("merchantId");
  const version = getQuery("version") || 0;
  const respData = await getAuthorizerIdApi({
    merchantId,
    version
  });
  const { mp } = respData;
  const data = await http({
    loading: false,
    url: `${prefix}/hms/businessCard/home/wechat/index/mpTicket`,
    fail(res) {
      console.log(res);
    },
    error(err) {
      console.log(err);
    },
    params: {
      url: encodeURIComponent(location.href.split("#")[0]),
      mpAuthorizerId: mp
    }
  });
  const { appId, timestamp, nonceStr, signature } = data;
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature, // 必填，签名，见附录1
    jsApiList: [
      "checkJsApi",
      "onMenuShareTimeline",
      "onMenuShareAppMessage",
      "onMenuShareQQ",
      "onMenuShareQZone",
      "getNetworkType",
      "openLocation",
      "getLocation",
      "closeWindow",
      "scanQRCode",
      "chooseWXPay",
      "openAddress"
    ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    openTagList: ["wx-open-launch-weapp"]
  });
}
function insertScript(scriptText) {
  const scriptTag = document.createElement("script");
  const script = document.createTextNode(scriptText);
  scriptTag.appendChild(script);
  document.body.appendChild(scriptTag);
}
async function setShare(params) {
  const {
    title,
    desc,
    link,
    imgUrl,
    type = "",
    dataUrl = "",
    shouldGetWxConfig = true,
    success,
    cancel
  } = params || {};
  // 暴露给app的代码
  const shareDataHtml = [
    "shareData = {",
    '  "title": "' + title + '",',
    '  "desc": "' + desc + '",',
    '  "link": "' + link + '",',
    '  "imgUrl": "' + imgUrl + '"',
    "}",
    "function getShareData(){",
    "  return JSON.stringify(shareData)",
    "}"
  ];

  insertScript(shareDataHtml.join("\n"));
  // if (shouldGetWxConfig && __MODE__ === 'build') {
  await wxConfig();
  // }
  wx.ready(() => {
    // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
    wx.updateAppMessageShareData({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success() {
        success && success();
      },
      cancel: function() {
        cancel && cancel();
      }
    });

    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
    wx.updateTimelineShareData({
      title, // 分享标题
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success() {
        success && success();
      },
      cancel: function() {
        cancel && cancel();
      }
    });

    wx.onMenuShareTimeline({
      title, // 分享标题
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success() {
        success && success();
      },
      cancel: function() {
        cancel && cancel();
      }
    });

    wx.onMenuShareAppMessage({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      type, // 分享类型,music、video或link，不填默认为link
      dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
      success() {
        success && success();
      },
      cancel: function() {
        cancel && cancel();
      }
    });

    wx.onMenuShareQQ({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接
      imgUrl, // 分享图标
      success() {
        success && success();
      },
      cancel: function() {
        cancel && cancel();
      }
    });

    wx.onMenuShareQZone({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接
      imgUrl, // 分享图标
      success() {
        success && success();
      },
      cancel: function() {
        cancel && cancel();
      }
    });
  });
}
export function wxShare(params) {
  loadWxSdk(() => {
    setShare(params);
  });
}
