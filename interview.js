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

const news = function newFn(fn, ...args) {
  const obj = Object.create(fn.prototype); // 创造对象原型
  const ret = fn.apply(obj, args); // 改变this 指向

  return ret instanceof Object ? ret : obj;
};

//  继承

function Person(username) {
  this.skills = ['php', 'golang', 'javascript', 'css'];
  this.username = username;
}

Person.prototype.showName = function show() {
  return this.username;
}

function Teacher(username) {
  // 获取Person 属性
  Person.call(this, username)
}

function dummy(superPrototype) {
  const D = function () {}
  D.prototype = superPrototype;
  return new D();
}

function inheritObje(subClass, superClass) {
  const dumpPrototype = dummy(superClass.prototype) // 复制父类的方法
  subClass.prototype = dumpPrototype;  //再把这个对象给子类的原型对象
  superClass.constructor = subClass; //constructor指向子类构造函数
}

inheritObje(Teacher, Person);