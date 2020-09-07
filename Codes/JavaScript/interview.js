/**
 * 已知如下数组
 * var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
 * 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
 */

const answer = (arr = []) =>
  Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b);

/**
 * 深度优先遍历
 * @param {*} node
 * 第一次:  stack = [parent]
 *        item = [parent]
 *        children = [child-1, child-2, child-3]
 *        nodes = [parent]
 *        stack = [child-3, child-2, child-1]
 * 第二次: stack = [child-3, child-2, child-1]
 *        item = [child-1]
 *        chidlren =[child-1-1, child-1-2, child-1-3]
 *        nodes = [parent, child-1]
 *        stack = [child-3, child-2, child-1-3, child-1-2, child-1-1]
 * 第三次: stack = [child-3, child-2, child-1-3, child-1-2, child-1-1]
 *        item = [child-1-1]
 *        chidlren =[child-1-1-1]
 *        nodes = [parent, child-1, child-1-1]
 *        stack = [child-3, child-2, child-1-3, child-1-2, child-1-1-1]
 * 第四次: stack = [child-3, child-2, child-1-3, child-1-2, child-1-1-1]
 *        item = [child-1-1-1]
 *        chidlren =[]
 *        nodes = [parent, child-1, child-1-1, child-1-1-1]
 *        stack = [child-3, child-2, child-1-3, child-1-2]
 * 第五次  stack = [child-3, child-2, child-1-3, child-1-2]
 *        item = [child-1-2]
 *        children = [child-1-2-1]
 *        nodes = [parent, child-1, child-1-1, child-1-1-1, child-1-2]
 *        stack = [child-3, child-2, child-1-3, child-1-2-1]
 * 第六次  stack = [child-3, child-2, child-1-3, child-1-2-1]
 *        item = [child-1-2-1]
 *        children = []
 *        nodes = [parent, child-1, child-1-1, child-1-1-1, child-1-2, child-1-2-1]
 *        stack = [child-3, child-2, child-1-3]
 * 第七次  stack = [child-3, child-2, child-1-3]
 *        item = [child-1-3]
 *        children = []
 *        nodes = [parent, child-1, child-1-1, child-1-1-1, child-1-2, child-1-2-1, child-1-3]
 *        stack = [child-3, child-2]
 * ....一次类推
 */
// eslint-disable-next-line no-unused-vars
const deepTraversal = node => {
  const stacks = [];
  const nodes = [];
  if (node) {
    stacks.push(node);
    while (stacks.length) {
      const item = stacks.pop();
      const { children } = item;
      nodes.push(item);

      for (let index = children.length - 1; index >= 0; index -= 1) {
        stacks.push(children[index]);
      }
    }
  }
  return nodes;
};

/**
 * 广度优先遍历
 * @param {*} node
 * 第一次:  stack = [parent]
 *        item = [parent]
 *        children = [child-1, child-2, child-3]
 *        nodes = [parent]
 *        stack = [child-1, child-2, child-3]
 * 第二次: stack = [child-1, child-2, child-3]
 *        item = [child-1]
 *        chidlren =[child-1-1, child-1-2, child-1-3]
 *        nodes = [parent, child-1]
 *        stack = [child-2, child-3, child-1-1, child-1-2, child-1-3]
 * 第三次: stack = [child-2, child-3, child-1-1, child-1-2, child-1-3]
 *        item = [child-2]
 *        chidlren =[child-2-1, child-2-2]
 *        nodes = [parent, child-1, child-2]
 *        stack = [child-3, child-1-1, child-1-2, child-1-3, child-2-1, child-2-2]
 * 第四次: stack = [child-3, child-1-1, child-1-2, child-1-3, child-2-1, child-2-2]
 *        item = [child-3]
 *        chidlren =[child-3-1]
 *        nodes = [parent, child-1, child-2, child-3]
 *        stack = [child-1-1, child-1-2, child-1-3, child-2-1, child-2-2, child-3-1]
 * 第五次  stack = [child-1-1, child-1-2, child-1-3, child-2-1, child-2-2, child-3-1]
 *        item = [child-1-1]
 *        children = [child-1-1-1]
 *        nodes = [parent, child-1, child-2, child-3, child-1-1]
 *        stack = [child-1-2, child-1-3, child-2-1, child-2-2, child-3-1, child-1-1-1]
 * 第六次  stack = [child-1-2, child-1-3, child-2-1, child-2-2, child-3-1, child-1-1-1]
 *        item = [child-1-2]
 *        children = [child-1-2-1]
 *        nodes = [parent, child-1, child-2, child-3, child-1-1, child-1-2]
 *        stack = [child-1-3, child-2-1, child-2-2, child-3-1, child-1-1-1, child-1-2-1]
 * ....一次类推
 */
// eslint-disable-next-line no-unused-vars
const widthTraversal = node => {
  const stacks = [];
  const nodes = [];
  if (node) {
    stacks.push(node);
    while (stacks.length) {
      const item = stacks.shift();
      const { children } = item;
      nodes.push(item);
      for (let index = 0; index < children.length; index += 1) {
        stacks.push(children[index]);
      }
    }
  }
};

// 第 14 题：如何实现一个 new
// 每一个new都有4个步骤
// 1. 返回一个空对象
// 2. 链接空对象到原本的原型上
// 3. 改变this的指向
// 4. 如果不是返回对象,那么返回this

const news = function newFn(fn, ...args) {
  const obj = Object.create(fn.prototype); // 创造对象原型, Object.create方法返回的永远是个空对象,只是连接原型
  const ret = fn.apply(obj, args); // 改变this 指向

  return ret instanceof Object ? ret : obj; // 如果不是返回对象,那么返回this
};

//  继承

function Person(username) {
  this.skills = ["php", "golang", "javascript", "css"];
  this.username = username;
}

Person.prototype.showName = function show() {
  return this.username;
};

function Teacher(username) {
  // 获取Person 属性
  Person.call(this, username);
}

function dummy(superPrototype) {
  const D = function() {};
  D.prototype = superPrototype;
  return new D();
}

function inheritObje(subClass, superClass) {
  const dumpPrototype = dummy(superClass.prototype); // 复制父类的方法
  subClass.prototype = dumpPrototype; //再把这个对象给子类的原型对象
  dumpPrototype.constructor = subClass; //constructor指向子类构造函数
}

inheritObje(Teacher, Person);

// ['1', '2', '3'].map(parseInt)
/**
 * 拆分为parseInt(1, 0) => 0 默认是10进制，返回1本身
 * 拆分为parseInt(2, 1) => 0 是1进制，2大于进制本身， 无法解析，返回NaN
 * 拆分为parseInt(3, 2) => 0 是2进制，3大于进制本身， 无法解析，返回NaN
 */
["1", "2", "3"].map(parseInt); // [1, NaN, NaN]

// 什么是防抖和节流？有什么区别？如何实现？

// 1. 防抖

/**
 * 防抖函数
 * @param {function} func 执行函数
 * @param {number} wait 延迟执行时间
 * @param {boolen} immediate 是否立刻执行
 */
function debounce(func, wait = 50, immediate = false) {
  let timer, context, args;

  const later = () =>
    setTimeout(() => {
      timer = null;
      if (!immediate) {
        func.apply(context, args);
        context = null;
        args = null;
      }
    }, wait);

  return function realPart(...params) {
    if (!timer) {
      timer = later();
      if (immediate) {
        func.apply(this, params);
      } else {
        context = this;
        args = params;
      }
    } else {
      clearTimeout(timer);
      timer = later();
    }
  };
}

/**
 *
 * @param {function} func 执行函数
 * @param {number} wait 间隔时间
 * @param  {object} options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                            如果想忽略结尾函数的调用，传入{trailing: false}
 *                            两者不能共存，否则函数不能执行
 */

function throttle(func, wait, options = {}) {
  let result, timeout, context, args;
  let previous = 0; // 之前的时间戳

  const later = () => {
    previous = options.leading === false ? 0 : +new Date();
    timeout = null;
    result = func.apply(context, args);
    context = null;
    args = null;
  };

  return function throttled(...params) {
    const now = +new Date();
    if (!previous && options.leading === false) {
      previous = now;
    }
    const remaining = wait - (now - previous);
    context = this;
    args = params;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) {
        context = null;
        args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      // 当不设置options的时候，trailing为undefine
      //undefine !== false => true
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

// 介绍下重绘和回流（Repaint & Reflow），以及如何进行优化
// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/24

// 浏览器缓存读取规则
// https://www.jianshu.com/p/54cc04190252

// 实现一个 sleep 函数

const sleep = time => new Promise(resolve => setTimeout(resolve, time));
// 发布新闻时需要提醒发布的时间。写一个函数，传递一个参数为时间戳，完成时间的格式化。如果发布一分钟内，输出：刚刚；n 分钟前发布，输出：n分钟前；超过一个小时，输出：n小时前；超过一天，输出：n天前；但超过一个星期，输出发布的准确时间
// 字节跳动 笔试2：格式化发布时间
function formatTime(date) {
  const min = 60 * 1000;
  const hour = 60 * min;
  const day = 24 * hour;
  const week = 7 * day;
  const time = Date.now() - date;
  if (time < min) {
    return "刚刚";
  }
  if (time < hour) {
    return `${Math.floor(time / min)}分钟前`;
  }
  if (time < day) {
    return `${Math.floor(time / hour)}小时前`;
  }
  if (time < week) {
    return `${Math.floor(time / day)}天前`;
  }
  return new Date(date).toLocaleString();
}
console.log(formatTime(1554111847534)); // 发布时的时间戳

// lazyMan

class LazyMan {
  constructor(name) {
    this.name = name;
    this.task = [];
    console.log(`My name is ${name}`);
    setTimeout(() => {
      this.next();
    }, 0);
  }

  eat(food) {
    const fn = () => {
      console.log(`eatting ${food}`);
      this.next();
    };
    this.task.push(fn);
    return this;
  }
  sleep(time) {
    const fn = () =>
      setTimeout(() => {
        console.log(`I have sleep ${time} ms`);
        this.next();
      }, time);
    this.task.push(fn);
    return this;
  }

  sleepFirst(time) {
    const fn = () =>
      setTimeout(() => {
        console.log(`First I nded to sleep ${time} ms`);
        this.next();
      }, time);
    this.task.unshift(fn);
    return this;
  }
  next() {
    const fn = this.task.shift();
    fn && fn();
  }
}

// const lazyMan = new LazyMan("Tohn");

// lazyMan
//   .eat("lunch")
//   .sleepFirst(5000)
//   .sleep(10000)
//   .eat('dinner');

// 如何实现一个promise

const PENDING = Symbol("pending");
const FULFILLED = Symbol("fulfilled");
const REJECTED = Symbol("rejected");

function MyPromise(executor) {
  // 初始状态
  this.state = PENDING;
  // 初始值
  this.date = null;
  this.onResolvefns = [];
  this.onRejectedfns = [];

  // FULFILLED 状态之后要执行的函数
  const resolve = value => {
    if (value instanceof MyPromise) {
      return value.then(resolve, rejected);
    }
    setTimeout(() => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.date = value;
        this.onResolvefns.forEach(fn => typeof fn === "function" && fn(value));
      }
    });
  };

  // REJECTED 状态之后要执行的函数
  const rejected = value => {
    setTimeout(() => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.date = value;
        this.onRejectedfns.forEach(fn => typeof fn === "function" && fn(value));
      }
    });
  };

  try {
    executor(resolve, rejected); // promise 异步执行
  } catch (error) {
    rejected(error);
  }
}

MyPromise.prototype.then = function then(onresolve, onrejected) {
  onrejected =
    typeof onrejected === "function"
      ? onrejected
      : function onrejectDummy(value) {
          return value;
        };
  onresolve =
    typeof onresolve === "function"
      ? onresolve
      : function onresolveDummy(value) {
          return value;
        };
  const self = this;

  if (this.state === FULFILLED) {
    return new MyPromise((resolve, rejected) => {
      setTimeout(() => {
        try {
          const data = onresolve(self.date);
          if (data instanceof MyPromise) {
            data.then(resolve, rejected);
          }
          resolve(data); // 返回给then
        } catch (error) {
          rejected(error);
        }
      });
    });
  }

  if (this.state === REJECTED) {
    return new MyPromise((resolve, rejected) => {
      setTimeout(() => {
        try {
          const data = onrejected(self.date);
          if (data instanceof MyPromise) {
            data.then(resolve, rejected);
          }
        } catch (error) {
          rejected(error);
        }
      });
    });
  }

  return new MyPromise((resolve, rejected) => {
    self.onRejectedfns.push(value => {
      try {
        const data = onrejected(self.date);
        if (data instanceof MyPromise) {
          data.then(resolve, rejected);
        }
        rejected(data);
      } catch (error) {
        reject(error);
      }
    });
    self.onResolvefns.push(value => {
      try {
        const data = onresolve(self.date);
        if (data instanceof MyPromise) {
          data.then(resolve, rejected);
        }
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  });
};

// new MyPromise((resolve, reject) => {
//   const random = Number.parseInt(Math.random() * 10);
//   if (random >= 5) {
//     return setTimeout(() => {
//       resolve(2);
//     }, 1000);
//   }
//   return reject("456");
// })
//   .then()
//   .then(data => {
//     console.log(data + 1);

//     return data + 1;
//   })
//   .then(data => {
//     console.log(data + 1);
//   });

// 实现一个深拷贝

function deepClone(sources) {
  if (!sources || typeof sources !== "object") {
    throw new Error("error arguments", "shallowClone");
  }
  const target = Array.isArray(sources) ? [] : {};
  for (const key in sources) {
    if (Object.hasOwnProperty.call(sources, key)) {
      if (sources[key] && typeof sources[key] === "object") {
        target[key] = Array.isArray(sources[key]) ? [] : {};
        target[key] = deepClone(sources[key]);
      } else {
        target[key] = sources[key];
      }
    }
  }
  return target;
}

if (!Promise) {
  const PENDING = Symbol("PENDING");
  const FULFILLED = Symbol("fulfilled");
  const REJECTED = Symbol("rejected");
  class Promise {
    constructor(executor) {
      this.data = null;
      this.onRejectedfns = [];
      this.onResolvefns = [];
      this.state = PENDING;

      const resolve = value => {
        if (value instanceof Promise) {
          return value.then(resolve, rejected);
        }
        setTimeout(() => {
          if (this.state === PENDING) {
            this.state = FULFILLED;
            this.data = value;
            this.onResolvefns.forEach(
              fn => fn && typeof fn === "function" && fn()
            );
          }
        });
      };

      const rejected = value => {
        if (value instanceof Promise) {
          return value.then(resolve, rejected);
        }
        setTimeout(() => {
          if (this.state === PENDING) {
            this.state = REJECTED;
            this.data = value;
            this.onRejectedfns.forEach(
              fn => fn && typeof fn === "function" && fn()
            );
          }
        });
      };

      try {
        executor(resolve, rejected);
      } catch (error) {
        rejected(err);
      }
    }
    then(onresolve, onrejected) {
      onresolve = typeof onresolve === "function" ? onresolve : value => value;
      onrejected =
        typeof onrejected === "function" ? onrejected : value => value;
      const self = this;
      if (this.state === FULFILLED) {
        return new Promise((resolve, rejected) => {
          setTimeout(() => {
            try {
              const data = onresolve(self.data);
              if (data instanceof Promise) {
                data.then(resolve, reject);
              }
              resolve(data);
            } catch (error) {
              rejected(err);
            }
          });
        });
      }
      if (this.state === REJECTED) {
        return new Promise((resolve, rejected) => {
          setTimeout(() => {
            try {
              const data = onrejected(self.data);
              if (data instanceof Promise) {
                data.then(resolve, reject);
              }
              resolve(data);
            } catch (error) {
              rejected(err);
            }
          });
        });
      }

      return new Promise((resolve, reject) => {
        self.onRejectedfns.push(value => {
          try {
            const data = onrejected(self.data);
            if (data instanceof Promise) {
              data.then(resolve, reject);
            }
            reject(data);
          } catch (error) {
            reject(data);
          }
        });
        self.onResolvefns.push(value => {
          try {
            const data = onresolve(self.data);
            if (data instanceof Promise) {
              data.then(resolve, reject);
            }
            resolve(data);
          } catch (error) {
            reject(data);
          }
        });
      });
    }
  }
}

if (!Function.prototype.bind) {
  Function.prototype.bind = function bind() {
    // 保存参数和执行上下文
    const [context, ...args] = [...arguments];
    const func = this;
    const retFnc = function dommy() {
      Array.prototype.push.apply(args, arguments);
      return func.apply(this instanceof func ? this : context, args);
    };
    retFnc.prototype = new func();
    return retFnc;
  };
}
