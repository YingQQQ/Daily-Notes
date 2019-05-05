/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
// 如何动态的改变对象状态
let a = 3;
// eslint-disable-next-line no-unused-vars
let b = 10 * a;

// console.log(a, b); // 3, 30

a = 4;
// console.log(a, b); // 4, 30, b并没有改变

b = 10 * a;

// console.log(a, b); // 4, 40, b才发生改变

// 如果我们能够自动的进行 b = 10 * a; 这个过程就完美了
// 我们需要一个func

a = 3;
function onAchange(fn) {
  // eslint-disable-next-line no-unused-expressions
  typeof fn === "function" && fn();
}

onAchange(() => {
  b = 10 * a;
});
// console.log(a, b); // 3, 30

a = 4;

onAchange(() => {
  b = 10 * a;
});
// console.log(a, b); // 4, 40

// 第一步
// <span class="cell b1"></span>
// 如果我们要给span插入元素我们需要使用原生方法
//  document.querySelector('.cell .b1').textContent = state.a * 10
// 这个时候如果我们改变state.a的状态 span里面的内容并不会发生改变,因此我们也需要一个function
// onStateChanged(() => {
//   document.querySelector(".cell .b1").textContent = state.a * 10;
// });

// 第二步
// <span class="cell b1">{{state.a * 10}}</span>
// onStateChanged(() => {
//   view = render(state)
// });

let update;
// eslint-disable-next-line no-unused-vars
let state;

/**
 * @param {func} _update
 */
const onStateChanged = _update => {
  update = _update;
};

const setState = newState => {
  state = newState;
  update(); // 例如下面的function
  // () => {
  //   view = render(state)
  // }
};

onStateChanged(() => {
  console.log("just a test, next line is real part");
  // () => {
  //   view = render(state)
  // }
});

setState({
  a: 5
});

// console.log(state); // { a: 5 }

/**
 * 第三步
 * 对象如何动态改变
 * state.a = 5 ==> state.a == 6
 * <span class="cell b1">{{state.a}}</span> 如何自动的修改dom => onStateChanged 函数
 * 可以使用Object.defineProperty中getter和setter
 * 例如convert
 */

function convert(objs) {
  Object.keys(objs).forEach(key => {
    let internalValue = objs[key]; // 注意闭包
    Object.defineProperty(objs, key, {
      get() {
        console.log(`get返回值${internalValue}`);
        return internalValue;
      },
      set(value) {
        console.log(`set属性值${value}`);
        internalValue = value + 1;
      }
    });
  });
}

const objs = {
  a: 1,
  b: 2
};

convert(objs);
// objs.a = 3;
// console.log(objs.a === 4); // true

// 第四步
// 我们需要一个能自动执行函数,类似Mobx

let activeUpdate = null;

function autorun(updateFn) {
  function wrappedUpdate() {
    activeUpdate = wrappedUpdate;
    updateFn();
    activeUpdate = null;
  }
  wrappedUpdate()
}

class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (activeUpdate) {
      // ...
      this.subscribers.add(activeUpdate);
    }
  }

  notify() {
    this.subscribers.forEach(sub => sub())
  }
}

function observe(obj) {
  Object.keys(obj).forEach(key => {
    let internalValue = obj[key];
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        console.log(`getting key "${key}": ${internalValue}`);
        dep.depend();
        return internalValue;
      },
      set(value) {
        const changed = internalValue !== value;
        internalValue = value;
        console.log(`setting key "${key}" to: ${value}`);
        if (changed) {
          dep.notify()
        }
      }
    })
  })
}

const newState = {
  count: 0
};

observe(newState);

autorun(() => {
  // console.log(`newState.count => ${newState.count}`);
  newState.count = 2
});

newState.count += 3;

console.log(newState.count === 5);