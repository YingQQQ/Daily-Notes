/**
 * 第一部分,比较两个对象是否相同,主要是比较0和-0, 和NaN
 * @param {any} x
 * @param {any} y
 */
const objectIS = function objectIs(x, y) {
  const isNegative = a => a === 0 && 1 / a === -Infinity;
  // eslint-disable-next-line no-self-compare
  const isNaNs = a => a !== a;
  const xIsNegative = isNegative(x);
  const yIsNegative = isNegative(y);
  if (xIsNegative || yIsNegative) {
    return xIsNegative && yIsNegative;
  }
  if (isNaNs(x) && isNaNs(y)) {
    return true;
  }
  return x === y;
};

console.log(objectIS(0, -0) === false);
console.log(objectIS(-0, -0) === true);
console.log(objectIS(NaN, NaN) === true);
console.log(objectIS("0", -0) === false);

/**
 * 第二部分 隐式转换
 * string转换, 优先使用toString,然后valueOf
 * number转换, 优先使用valueOf,然后toString
 */
const toSting = {
  toString() {
    return "x";
  }
};
console.log(`${toSting}y`);

const toNumber = {
  valueOf() {
    return 3;
  }
};

console.log(1 + toNumber);

/**
 * toBoolen, 隐式的转换
 * 其中falsyd的值: '',NaN, undefined, null, 0, -0,false
 * 其余都是真值
 */

// ⑴
console.log(1 < 2 < 3);
// ⑴ 和 ⑵ 相等的, 因为上面⑴中的过程,其实是先比较 1 < 2 当然是 true,
// 而 true 隐式的转换成 1, 1 < 3 当然返回true
console.log(true < 3);
console.log(1 < 3);
// ⑷ 结果就是false
console.log(3 > 2 > 1);

/**
 * 隐式转换也有优点,但是需要理解原理,
 * 例如下面: '2' 被隐式转换成了数字2, 减少了Number('2')的代码量
 */
console.log(Number("2") < 1);
console.log("2" < 1);
console.log(1 < "2");

/**
 * == 和 === 的区别，==比较的时候会隐式的转换类型, 而=== 不会
 */

const workNumber = 42;
const workNumberArray = [42];

// 因为[42]字符串化'42', 然后 42 == '42'; 隐式转换 42 == 42
// eslint-disable-next-line eqeqeq
console.log(workNumber == workNumberArray); // true
console.log(workNumber === workNumberArray); // false

// 箭头函数的this问题，重点：箭头函数没有this,因此需要在上级的作用域中检索(scope)
const workShop1 = {
  teacher: "Tom",
  ask: function askName(say) {
    console.log(this.teacher, say);
  }
};

// this.teacher = 'global';

const workShop2 = {
  teacher: "Tom",
  ask: say => {
    console.log(this.teacher, say); // 没有this, 因此需要到global scope去寻找, 可以尝试上面注释的内容global.teacher
  }
};
workShop1.ask("hello world");
workShop2.ask("hello world");

// 关于继承
// 继承可以理解为一种委托机制, Teacher的say, 通过prototype由Person实现
// 继承就是OLOO(oject link to other object)

function Person(name) {
  this.name = name;
}

Person.prototype.say = function say(something) {
  console.log(`${this.name} ask ${something}`);
};

function Teacher(name) {
  Person.call(this, name); // 赋予属性
}

Teacher.prototype = Object.create(Person.prototype);

Teacher.prototype.ask = function ask(question) {
  console.log(`Teacher said ${question}`);
};

const jack = new Teacher("jack");

jack.say("This is prototype inheritance");
jack.ask("What is prototype inheritance");

// OLOO(oject link to other object)

const PersonA = {
  setName(name) {
    this.name = name;
  },
  say(something) {
    console.log(`${this.name} ask ${something}`);
  }
};

const TeacherA = Object.assign(Object.create(PersonA), {
  ask(question) {
    console.log(`Teacher said ${question}`);
  }
});

const EnglishTeacher = Object.create(TeacherA);
EnglishTeacher.ask("EnglishTeacher");
EnglishTeacher.setName("July");
EnglishTeacher.say("EnglishTeacher");

// 继承的关键是Object.create

if (!Object.create) {
  Object.create = function objectCreate(o) {
    function F() {} // 创建一个没有副作用的空函数
    F.prototype = o; // 把需要继承的方法赋值给原型
    return new F(); // 实例化空函数,可以保护O对象的方法
  };
}

// ES6 部分

// 模板字符串
const amount = "Home";
const other = "hospital";

function formatCurrent(string, ...value) {
  // console.log(Array.isArray(string)) // true
  let str = "";
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < string.length; index++) {
    if (index > 0) {
      str += String(value[index - 1]).toUpperCase();
    }
    str += string[index];
  }
  return str;
}

console.log(
  formatCurrent`The total for your order is ${amount} and ${other}` ===
    "The total for your order is HOME and HOSPITAL"
);

// String padding 和 String tramming(ES2019)

const str = "hello";

// str.padEnd 同理
str.padStart(5); // 'hello' 没有改变内容和,因为hello本来的长度就是5, 因为我们的使用的是ASCII32字符空间
str.padStart(8); // '   hello'
str.padStart(8, "#"); // '###hello'
str.padStart(8, "12345"); // '123hello', 填充内容过长会被截取
str.padStart(8, "ab"); // 'abahello', 填充内容段誉长度,则填充内容会被循环

// destructuring 结构， 只要是其中的,(comma逗号)

const [first, , third, ...others] = [1, 2, 3, 4, 5, 6];

console.log(first, third, others); // 1, 3, [4,5,6]
