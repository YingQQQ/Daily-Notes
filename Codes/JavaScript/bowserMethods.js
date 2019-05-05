/* eslint-disable no-unused-vars */

// 1.检查是否到达底部
const bottomVisible = () =>
  document.documentElement.clientHeight + window.screenY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

// 2. 事件发布/订阅模式

const createEventHub = () => ({
  hub: Object.create(null),
  on(event, handle) {
    if (!this.hub[event]) {
      this.hub[event] = [];
    }
    this.hub[event].push(handle);
  },
  emit(event, data) {
    (this.hub[event] || []).forEach(element => {
      element(data);
    });
  },
  off(event, handle) {
    const index = (this.hub[event] || []).findIndex(h => h === handle);
    if (index > -1) {
      this.hub[event].splice(index, 1);
    }
  }
});

const handle = data => console.log(data);
const hub = createEventHub();
let number = 0;

// Subscribe
hub.on("message", handle);
hub.on("message", () => console.log("message event fired"));
// eslint-disable-next-line no-plusplus
hub.on("increment", () => console.log(++number));

// Publish
hub.emit("message", "hello world");
hub.emit("message", { hello: "world" });
hub.emit("increment");

// Unsubscribe
hub.off("message", handle);
hub.emit("message", "hello world");

// 3. 获取当前的URL

const currentUrl = () => window.location.href;

// 4. 检查设备的类型是手机还是平板

const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "Desktop";
// 5. elementContains 查看元素是否包含子元素

const elementContains = (parent, child) =>
  parent !== child && parent.contains(child);

// 6. getStyle 返回所选元素css规则的值

const getStyle = (el, rule) => window.getComputedStyle(el)[rule];

// 7. hasClass 查看元素是否包含css类

const hasClass = (el, className) => el.classList.contains(className);
