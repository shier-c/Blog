![](https://user-gold-cdn.xitu.io/2019/5/7/16a91854a90bb659?w=651&h=289&f=jpeg&s=157638)
## 前言

写久了业务代码的我，已经要被社会抛弃了。今天回过头去巩固基础知识，发现有很多自己业务中不经常用，或者说是不知道那个方法，导致自己重写一个方法去实现。关于Array对象的方法你是否只用`concat`、`join`、`pop`、`push`、`shift`、`unshift`、`reverse`、`sort`、`slice`、`splice`、`toString`、`indexOf`、`find`等？接下来我们就一起回顾一下那些我们用的少或者没有用过的Array对象方法！

### 1. `Array.from()`

> 从一个类似数组或可迭代对象中创建一个新的数组实例

#### 1.1 语法

```javascript
/**
 * @description - 从一个类似数组或可迭代对象中创建一个新的数组实例(伪数组对象:拥有一个 length 属性和若干索引属性的任意对象;可迭代对象:可以获取对象中的元素,如 Map和 Set 等)
 * @param arrayLike - 想要转换成数组的伪数组对象或可迭代对象.
 * @param mapFn - 可选参数，如果指定了该参数，新数组中的每个元素会执行该回调函数.
 * @param thisArg - 可选参数，执行回调函数 mapFn 时 this 对象.
 * @return { Array } - 一个新的数组实例
 */
Array.from(arrayLike[, mapFn[, thisArg]])
```

#### 1.2 示例

```javascript
// Array from a String
Array.from('foo'); 
// ["f", "o", "o"]

// Array from a Set
let s = new Set(['foo', window]); 
Array.from(s)
// ["foo", window]

// Array from a Map
let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m); 
// [[1, 2], [2, 4], [4, 8]]

// Array from an Array-like object (arguments)
function f() {
  return Array.from(arguments);
}
f(1, 2, 3);
// [1, 2, 3]

// 在Array.from中使用箭头函数
Array.from([1, 2, 3], x => x + x);  
// [2, 4, 6]

// 伪数组
Array.from({length: 5});
// [undefined, undefined, undefined, undefined, undefined]
Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]

// 改变回调函数 mapFn 时 this 对象
Array.from([1, 2, 3], function(){console.log(this)}); 
// 浏览器环境下是三次 Window对象

var obj ={name: 'obj'}
Array.from([1, 2, 3], function(){console.log(this)}, obj); 
// 三次 obj 对象
```

### 2. ` Array.prototype.copyWithin()` 

> 浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

#### 2.1 语法

```javascript
/**
 * @description - 浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。
 * @param target - 0 为基底的索引，复制序列到该位置。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length.
 * @param start - 0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。如果 start 被忽略，copyWithin 将会从0开始复制.
 * @param end - 0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算.
 * @return { array } - 改变后的数组
 */
arr.copyWithin(target[, start[, end]])
```

#### 2.2 示例

```javascript
let numbers = [1, 2, 3, 4, 5];

numbers.copyWithin(-2);
// [1, 2, 3, 1, 2]

numbers.copyWithin(0, 3);
// [4, 5, 3, 4, 5]

numbers.copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]

numbers.copyWithin(-2, -3, -1);
// [1, 2, 3, 3, 4]

[].copyWithin.call({length: 5, 3: 1}, 0, 3);
// {0: 1, 3: 1, length: 5}

// ES2015 Typed Arrays are subclasses of Array
var i32a = new Int32Array([1, 2, 3, 4, 5]);

i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// On platforms that are not yet ES2015 compliant: 
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```


### 3. `Array.prototype.some()`

> 测试是否至少有一个元素通过由提供的函数实现的测试。

#### 3.1 语法

```javascript
/**
 * @description - 测试数组的元素是否至少一个通过了指定函数的测试。
 * @param callback - 用来测试每个元素的函数。
 * @param thisArg - 执行 callback 时使用的 this 值。
 * @return { Boolean } - 是否通过测试。
 */
arr.some(callback(element[, index[, array]])[, thisArg])
```

#### 3.2 示例

```javascript
function isBiggerThan10(element, index, array) {
  return element > 10;
}

[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true
```

### 4. `Array.prototype.every()`

> 测试数组的所有元素是否都通过了指定函数的测试。

#### 4.1 语法

```javascript
/**
 * @description - 测试数组的所有元素是否都通过了指定函数的测试。
 * @param callback - 用来测试每个元素的函数。
 * @param thisArg - 执行 callback 时使用的 this 值。
 * @return { Boolean } - 是否通过测试。
 */
arr.every(callback[, thisArg])
```

#### 4.2 示例

```javascript
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [12, 5, 8, 130, 44].every(isBigEnough);
// passed is false
passed = [12, 54, 18, 130, 44].every(isBigEnough);
// passed is true
```

### 5. `Array.prototype.flat()`

> 会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

#### 5.1 语法

```javascript
/**
 * @description - 会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
 * @param depth - 指定要提取嵌套数组的结构深度, 默认值为 1。
 * @return { array } - 一个包含将数组与子数组中所有元素的新数组。
 */
arr.flat(depth)
```

#### 5.2 示例

```javascript
var arr1 = [1, 2, [3, 4]];
arr1.flat(); 
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//使用 Infinity 作为深度，展开任意深度的嵌套数组
arr3.flat(Infinity); 
// [1, 2, 3, 4, 5, 6]

// 会移除数组中的空项
var arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]
```

### 6. `Array.prototype.flatMap()`

> 首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 `map` 和 深度值1的 `flat` 几乎相同，但 `flatMap` 通常在合并成一种方法的效率稍微高一些。

#### 6.1 语法

```javascript
/**
 * @description - 使用映射函数映射每个元素，然后将结果压缩成一个新数组。
 * @param callback - 可以生成一个新数组中的元素的函数，可以传入三个参数：
 * 		@param currentValue - 当前正在数组中处理的元素。
 * 		@param index - 可选的。数组中正在处理的当前元素的索引。
 *		@param array - 可选的。被调用的 map 数组。
 * @param thisArg - 可选的。执行 callback 函数时 使用的this 值。
 * @return { array } - 一个新的数组，其中每个元素都是回调函数的结果，并且结构深度 depth 值为1。
 */
arr.flatMap(function callback(currentValue[, index[, array]]) {
    // 返回新数组的元素
}[, thisArg])
```

#### 6.2 示例

```javascript
let arr = ["今天天气不错", "", "早上好"]

arr.map(s => s.split(""))
// [["今", "天", "天", "气", "不", "错"],[""],["早", "上", "好"]]

arr.flatMap(s => s.split(''));
// ["今", "天", "天", "气", "不", "错", "", "早", "上", "好"]
```

### 7. `Array.prototype.includes()`

> 用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
>
> **注意：对象数组不能使用includes方法来检测。**

#### 7.1 语法

```javascript
/**
 * @description - 用来判断一个数组是否包含一个指定的值。
 * @param valueToFind - 需要查找的元素值。
 * @param fromIndex - 可选的。从fromIndex 索引处开始查找 valueToFind。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 （即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。
 * @return { Boolean } - 是否包含。
 */
arr.includes(valueToFind[, fromIndex])
```

#### 7.2 示例

```javascript
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
```

### 8. `Array.prototype.lastIndexOf()`

> 返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 `fromIndex` 处开始。

#### 8.1 语法

```javascript
/**
 * @description - 返回指定元素在数组中的最后一个的索引。
 * @param searchElement - 被查找的元素。
 * @param fromIndex - 可选的。从此位置开始逆向查找。
 * @return { Boolean } - 是否包含。
 */
arr.lastIndexOf(searchElement[, fromIndex = arr.length - 1])
```

#### 8.2 示例

```javascript
var array = [2, 5, 9, 2];
var index = array.lastIndexOf(2);
// index is 3
index = array.lastIndexOf(7);
// index is -1
index = array.lastIndexOf(2, 3);
// index is 3
index = array.lastIndexOf(2, 2);
// index is 0
index = array.lastIndexOf(2, -2);
// index is 0
index = array.lastIndexOf(2, -1);
// index is 3
```

### 9. `Array.prototype.reduce()`

> 对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。

#### 9.1 语法

```javascript
/**
 * @description - 对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。
 * @param callback - 执行数组中每个值的函数，包含四个参数：
 * 		@param accumulator - 累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue。
 * 		@param currentValue - 当前正在数组中处理的元素。
 * 		@param index - 可选的。数组中正在处理的当前元素的索引。
 *		@param array - 可选的。被调用的 map 数组。
 * @param initialValue - 可选的。作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
 * @return - 函数累计处理的结果。
 */
arr.reduce(callback[, initialValue])
```

#### 9.2 示例

```javascript
// 数组中最大值
var arr = [10, 0, 100, 99, 48, 101];
var reducer = (x, y) => Math.max(x, y);
arr.reduce(reducer); // 101

// 累加
var reducer2 = (x, y) => x + y;
arr.reduce(reducer2); // 358
```
这里我们可以看看累加的运行过程：

| callback(也就是reducer2) | accumulator | currentValue | 返回值 |
| ------------------------ | ----------- | ------------ | ------ |
| 1                        | 0           | 10           | 10     |
| 2                        | 10          | 0            | 10     |
| 3                        | 10          | 100          | 110    |
| 4                        | 110         | 99           | 209    |
| 5                        | 209         | 48           | 257    |
| 6                        | 257         | 101          | 358    |

如果我们将 `initialValue` 这个参数也传入进去，我们再看一下效果：

```javascript
var arr = [10, 0, 100, 99, 48, 101];

// 累加
var reducer2 = (x, y) => x + y;
// initialValue,作为第一次调用 callback 函数时的第一个参数的值。
// 也就是说第一次调用 callback 的时候 x 的值就是10了。
arr.reduce(reducer2, 10); // 368
```
| callback(也就是reducer2) | accumulator | currentValue | 返回值 |
| ------------------------ | ----------- | ------------ | ------ |
| 1                        | 10          | 10           | 20     |
| 2                        | 20          | 0            | 20     |
| 3                        | 20          | 100          | 120    |
| 4                        | 120         | 99           | 219    |
| 5                        | 219         | 48           | 267    |
| 6                        | 267         | 101          | 368    |
### 10. `Array.prototype.entries()`

> 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。

#### 10.1 语法

```javascript
/**
 * @description - 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
 * @return { Array Iterator } - 一个新的 Array 迭代器对象。
 */
arr.entries()
```

#### 10.2 示例

```javascript
var arr = ["a", "b", "c"];
var iterator = arr.entries();
console.log(iterator);
/*
	Array Iterator {}
         __proto__:Array Iterator
         next:ƒ next()
         Symbol(Symbol.toStringTag):"Array Iterator"
         __proto__:Object
*/

for (let e of iterator) {
    console.log(e);
}

// [0, "a"] 
// [1, "b"] 
// [2, "c"]
```

> **注：以上大部分都是在文档里面的，只是个人平时使用笔记少或者没用过的，然后统一做个记录。貌似还都是ES6的，都9102年了，赶紧用起来！~~意思就是抄袭了一下文档，大佬轻喷！~~**

### 小广告

**我自己运营的公众号，记录我自己的成长！**

公众号：前端曰

公众号ID：js-say

ps：是(yue)不是(ri)

![](https://user-gold-cdn.xitu.io/2019/5/23/16ae4b504a87a348?w=400&h=400&f=jpeg&s=68709)