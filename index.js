/* eslint-disable function-paren-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */

// 1. ary
const ary = (fn, n) => (...args) => fn(...args.slice(0, n));
const firstTwoMax = ary(Math.max, 2);
const finalAry = [[2, 6, 'a'], [8, 4, 6], [10]].map(x => firstTwoMax(...x));
// [6, 8, 10]
console.log(finalAry);

// 2. call
const call = (key, ...args) => context => context[key](...args);

/**
 * call('map', x => 2 * x)
 * [1, 2, 3].map(x => 2 * x);
 */

Promise.resolve([1, 2, 3])
  .then(call('map', x => 2 * x))
  .then(console.log); // [ 2, 4, 6 ]
const map = call.bind(null, 'map');
Promise.resolve([1, 2, 3])
  .then(map(x => 2 * x))
  .then(console.log); // [ 2, 4, 6 ]

// 3. collectInto
const collectInto = fn => (...args) => fn(args);
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = new Promise(resolve => setTimeout(resolve, 2000, 3));
Promise.all([p1, p2, p3]).then(console.log);

const pall = collectInto(Promise.all.bind(Promise));
pall(p1, p2, p3).then(console.log);

// 4. flip
const flip = fn => (first, ...rest) => fn(...rest, first);
const a = {
  name: 'John Smith'
};

const b = {};

const merge = flip(Object.assign);
const mergePerson = merge.bind(null, a);
mergePerson(b); // 等价于 Object.assign(b, a);
console.log(b);

// 5. over

const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, [...args]));

const minMax = over(Math.min, Math.max);
const minMaxAry = minMax(1, 2, 3, 4, 5);
console.log(minMaxAry);

// 6. overArgs

const overArgs = (fn, transform) => (...args) =>
  fn(...args.map((val, i) => transform[i](val)));
// const overArgs = (fn, transform) => (...args) => fn([9, 3].map((val, i) => transform[i](val)));

const square = n => n * n;
const double = n => n * 2;
const fn = overArgs((x, y) => [x, y], [square, double]);
const overArg = fn(9, 3);
console.log(overArg);

// 7. pipeAsyncFunctions

const pipeAsyncFunctions = (...fns) => arg =>
  fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

const sum = pipeAsyncFunctions(
  x => x + 1,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2)), 2000),
  x => x + 3,
  async x => (await x) + 4
);

(async () => {
  const final = await sum(5);
  console.log(final);
})();

// 8. pipeFunctions

const pipeFunctions = (...fns) =>
  fns.reduce((p, c) => (...args) => c(p(...args)));

const add5 = x => x + 5;
const multiply = (x, y) => x + y;
const multiplyAndand5 = pipeFunctions(multiply, add5);
const result = multiplyAndand5(5, 2);
console.log(result);

// 9. promisify

const promisify = func => (...args) =>
  new Promise((resolve, reject) => {
    func(...args, (err, ret) => (err ? reject(err) : resolve(ret)));
  });

const deloy = promisify((time, callback) => setTimeout(callback, time));
deloy(2000).then(console.log('Hi'));

// 10. rearg

const rearg = (fuc, indexs) => (...args) =>
  fuc(...indexs.map(index => args[index]));
const rearged = rearg((...args) => [...args], [2, 1, 0]);
const reargAry = rearged('b', 'c', 'a');
console.log(reargAry);

// 11. spreadOver
const spreadOver = func => args => func(...args);
const arrayMax = spreadOver(Math.max);
const spreadOverAry = arrayMax([1, 2, 3]);
console.log(spreadOverAry);

// 12. unary
const unary = fn => val => fn(val);

const unaryAry = ['6', '8', '10'].map(unary(parseInt));
console.log(unaryAry);

// fllowers are Array methods
// 13. all
const all = (all, fn = Boolean) => all.every(fn);
console.log(all([4, 2, 3], x => x > 1));
console.log(all([4, 2, 3]));

// 14. allEqual
const allEqual = arrs => arrs.every(arr => arr === arrs[0]);
console.log(allEqual([1, 2, 3, 4, 5]));
console.log(allEqual([1, 1, 1, 1, 1]));
console.log(allEqual([1, 1, 1, 1, 2]));

// 15. any

const any = (arr, fn = Boolean) => arr.some(fn);
console.log(any([0, 1, 2, 0], x => x >= 2)); // true
console.log(any([0, 0, 1, 0])); // true

// 16. bifucate
const bifurcate = (arr, filter) =>
  arr.reduce(
    (acc, val, i) => {
      acc[filter[i] ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );
console.log(
  bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true])
); // [ ['beep', 'boop', 'bar'], ['foo'] ]

// 17. bifucateBy

const bifurcateBy = (arrs, fn) =>
  arrs.reduce(
    (p, c, i) => {
      p[fn(c, i) ? 0 : 1].push(c);
      return p;
    },
    [[], []]
  );
console.log(bifurcateBy(['beep', 'boop', 'foo', 'bar'], x => x[0] === 'b')); // [ ['beep', 'boop', 'bar'], ['foo'] ];

// 18. chunk

const chunk = (arr, size) =>
  Array.from(
    {
      length: Math.ceil(arr.length / size)
    },
    (val, index) => arr.slice(index * size, index * size + size)
  );

console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1,2],[3,4],[5]]

// 19. compact

const compact = arr => arr.filter(Boolean);

console.log(compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34])); // [ 1, 2, 3, 'a', 's', 34 ];

// 20. countBy

const countBy = (arr, fn) =>
  arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((previous, current) => {
      previous[current] = (previous[current] || 0) + 1;
      return previous;
    }, {});

console.log(countBy([6.1, 4.2, 6.3], Math.floor)); // {4: 1, 6: 2}
console.log(countBy(['one', 'two', 'three'], 'length')); // {3: 2, 5: 1}

// 21. countOccurrences

const countOccurrences = (arr, val) =>
  arr.reduce((prev, curt) => (curt === val ? prev + 1 : prev), 0);

console.log(countOccurrences([1, 1, 2, 1, 2, 3], 1)); // 3

// 22. deepFlatten

const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
console.log(deepFlatten([1, [2], [[3], 4], 5])); // [1,2,3,4,5]

// 23. difference 不再b中的元素
const difference = (a, b) => {
  const bSet = new Set(b);
  return a.filter(val => !bSet.has(val));
};

console.log(difference([1, 2, 3], [1, 2, 4])); // [3]

// 24. differenceBy

const differenceBy = (a, b, fn) => {
  const bSet = new Set(b.map(fn));

  return a.map(fn).filter(val => !bSet.has(val));
};

console.log(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)); // [1]
console.log(differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x)); // [2]

// 25. differenceWith

const differenceWith = (a, b, comp) =>
  a.filter(val => b.findIndex(el => comp(val, el)) === -1);

console.log(
  differenceWith(
    [1, 1.2, 1.5, 3, 0],
    [1.9, 3, 0],
    (a, b) => Math.round(a) === Math.round(b)
  )
); // [1, 1.2]

// 26. drop

const drop = (arr, n = 1) => arr.slice(n);
console.log(drop([1, 2, 3])); // [2,3]
console.log(drop([1, 2, 3], 2)); // [3]

// 27. dropRight

const dropRight = (arr, n = 1) => arr.slice(0, -n);

console.log(dropRight([1, 2, 3])); // [1,2]
console.log(dropRight([1, 2, 3], 2)); // [1]
console.log(dropRight([1, 2, 3], 42)); // []

// 27. filterNonUnique

const filterNonUnique = arr =>
  arr.filter(val => arr.indexOf(val) === arr.lastIndexOf(val));
console.log(filterNonUnique([1, 2, 2, 3, 4, 4, 5])); // [1, 3, 5]

// 28. filterNonUniqueBy

// const filterNonUniqueBy =

// 29. 斐波那契数列
// const fib = (n) => {
//   function fibIter(a, b, count) {
//     if (count === 0) {
//       return b;
//     }
//     return fibIter(a + b, a, count - 1);
//   }
//   return fibIter(1, 0, n);
// };

// 30. findLast

const findLast = (arr, fn) => arr.filter(fn).pop();
console.log(findLast([1, 2, 3, 4, 5], n => n % 2 === 1)); // 3;

// 31. findLastIndex

const findLastIndex = (arr, fn) =>
  arr
    .map((val, i) => [i, val])
    .filter(([val, i]) => fn(val, i))
    .pop()[0];

console.log(findLastIndex([1, 2, 3, 4], n => n % 2 === 1)); // 2 (index of the value 3);

// 32. flatten

const flatten = (arr, depth = 1) =>
  arr.reduce(
    (p, v) => p.concat(depth > 1 && Array.isArray(v) ? flatten(v) : v),
    []
  );

console.log(flatten([1, [2], 3, 4])); // [1, 2, 3, 4];

// 33. forEachRight

const forEachRight = (arr, fn) =>
  arr
    .slice(0)
    .reverse()
    .forEach(fn);
console.log(forEachRight([1, 2, 3, 4], val => console.log(val))); // '4', '3', '2', '1';

// 34. head

const head = arr => arr[0];

console.log(head([1, 2, 3]));

// 35. indexOfAll

const indexOfAll = (arr, val) =>
  arr.reduce((prev, curt, i) => (curt === val ? [...prev, i] : prev), []);
console.log(indexOfAll([1, 2, 3, 1, 2, 3], 1)); // [0,3]
console.log(indexOfAll([1, 2, 3], 4)); // []

// 36. initial

const initial = arr => arr.slice(0, -1);
console.log(initial([1, 2, 3])); // [1,2]

// 37. initialize2DArray

const initialize2DArray = (len, depth, val = null) =>
  Array.from({ length: len }).map(
    () => Array.from({ length: depth }).fill(val)
    // eslint-disable-next-line function-paren-newline
  );

console.log(initialize2DArray(2, 2, 0)); // [[0,0], [0,0]]);

// 38. initializeArrayWithRange

const initializeArrayWithRange = (end, start = 0, step = 1) =>
  Array.from(
    { length: Math.ceil((end - start + 1) / step) },
    (val, i) => i * step + start
  );
console.log(initializeArrayWithRange(5)); // [0,1,2,3,4,5]
console.log(initializeArrayWithRange(9, 0, 2)); // [0,2,4,6,8]
console.log(initializeArrayWithRange(7, 3)); // [3,4,5,6,7]

// 39. initializeArrayWithRangeRight

const initializeArrayWithRangeRight = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end - start + 1) / step) }).map(
    (val, i, arr) => (arr.length - i - 1) * step + start
  );
console.log(initializeArrayWithRangeRight(5)); // [5,4,3,2,1,0]

// 40. initializeArrayWithValue

const initializeArrayWithValue = (n, val) =>
  Array.from({ length: n }).fill(val);

console.log(initializeArrayWithValue(5, 2)); // [2, 2, 2, 2, 2]

// 41. initializeNDArray

const initializeNDArray = (val, ...args) =>
  (args.length === 0
    ? val
    : Array.from({ length: args[0] }).map(() =>
      initializeNDArray(val, ...args.slice(1))
    ));

console.log(initializeNDArray(5, 2)); // [5, 5]

// 42. intersection

const intersection = (a, b) => {
  const bSet = new Set(b);
  return a.filter(val => bSet.has(val));
};

console.log(intersection([1, 2, 3], [4, 3, 2])); // [2, 3]

// 43. intersectionBy
const intersectionBy = (a, b, fn) => {
  const bSet = new Set(b.map(fn));
  return a.filter(val => bSet.has(fn(val)));
};

console.log(intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)); // [2.1];
