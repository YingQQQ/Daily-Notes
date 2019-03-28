### 1. 对象在内存中的创建

首先是一段简单的代码示例

```javascript
const obj1 = Object.creact();
obj1.name = 'abc';
obj1.showName = function() {
    return obj1.name;
}

const obj2 = Object.creact();
obj2.name = 'qwe';
obj2.showName = function() {
    return obj2.name;
}

console.log(obj1.showName === 'abc') // true
console.log(obj2.showName === 'qwe') // true
```

上面的代码太麻烦了,每次创建对象都需要重复做很多步骤,因此出现了工厂模式.

下面的代码展示了工厂模式

```javascript
function creactObj(name) {
    const obj = Object.create();
    obj.name = name;
    obj.showName = function() {
        return obj.name;
    }
    return obj;
}

const obj1 = createObj('abc');
const obj2 = createObj('qwe')
```

上面的示例虽然简化了创建对象的过程,却无法分辨对象的类型

因此采用new关键字来初始化构造函数

