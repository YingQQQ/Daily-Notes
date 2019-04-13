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
    return xIsNegative && yIsNegative
  }
  if (isNaNs(x) && isNaNs(y)) {
    return true;
  }
  return x === y;
}

console.log(objectIS(0, -0) === false)
console.log(objectIS(-0, -0) === true)
console.log(objectIS(NaN, NaN) === true)
console.log(objectIS('0', -0) === false)

/**
 * 第二部分 隐式转换
 * string转换, 优先使用toString,然后valueOf
 * number转换, 优先使用valueOf,然后toString
 */
const toSting = {
  toString() {
    return "x";
  }
}
console.log(`${toSting}y`)

const toNumber = {
  valueOf() {
    return 3;
  }
}

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
console.log(Number('2') < 1);
console.log('2' < 1);
console.log(1 < '2');

/**
 * == 和 === 的区别，==比较的时候会隐式的转换类型, 而=== 不会
 */

 const workNumber = 42;
const workNumberArray = [42];

// 因为[42]字符串化'42', 然后 42 == '42'; 隐式转换 42 == 42
// eslint-disable-next-line eqeqeq
console.log(workNumber == workNumberArray); // true
console.log(workNumber === workNumberArray); // false


console.log('Frank' > 'Suzy');
