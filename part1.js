/*
 * 一、谈谈你是如何理解JS异步编程的，EventLoop、消息队列都是做什么的， 什么是宏任务， 什么是微任务？
 */
/* 答： 1、JS异步编程是通过以回调函数为基础， 结合事件循环和消息队列实现的异步编程方案。js是单线程的， JS异步编程
*          能解决单线程JS无法同时处理大量耗时任务的弊端。
*       2、Eventloop叫做事件循环，可以理解为一种循环监听器， 可以将消息队列中的事件压入调用栈执行。
*          消息队列可以看作是一种待办的事件表，负责存放异步回调，按照先进先出的顺序通过Eventloop将存放的异步事件压入调用栈中执行。 
*       3、存放在消息队列中的任务称之为宏任务，通过事件触发线程进行维护。
*       4、微任务会存放在微任务队列中， 指本轮宏任务执行完， 在下一轮宏任务开始之前需要执行的任务，会直接在当前任务结束过后立即执行。
*/      

/*
 * 代码题：
 * 一、 将下面异步代码使用Promise的方式改进
 */
setTimeout(function () {
    var a = 'hello'
    setTimeout(function() {
       var b = 'lagou'
       setTimeout(function() {
          var c = 'I ♥ U'
          console.log(a + b + c)  
       }, 10)     
    }, 10)
}, 10)

// 解答：
new Promise(function(resolve, reject) {
    var obj = {}
    obj.a = 'hello '
    resolve(obj)
}).then(function(res) {
    res.b = 'lagou '
    return res
}).then(function(res) {
    res.c = 'I ♥ U'
    console.log(res.a + res.b + res.c);
})

/*
 * 二、基于一下代码完成下面的四个练习
 */
const fp = require('lodash/fp')
//数据
//horsepower 马力, dollar_value 价格, in_stock 库存
const cars = [
    {
        name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true
    },
    {
        name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false
    },
    {
        name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false
    },
    {
        name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false
    },
    {
        name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true
    },
    {
        name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false
    }
]

// 练习1： 使用函数组合fp.flowRight() 重新实现下面这个函数
// let inLastInStock = function (cars) {
//     // 获取最后一条数据
//     let last_car = fp.last(cars)
//     // 获取最后一天数据的 in_stock 属性值
//     return fp.prop('in_stock', last_car)
// }

// console.log(inLastInStock(cars));  


const inLastInStock1 = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log(inLastInStock1(cars))

// 练习2： 使用fp.flowRight()、fp.prop()和fp.first()获取第一个car的name
// 解答：
const inFirstName = fp.flowRight(fp.prop('name'), fp.first)
console.log('第一个car的Name：', inFirstName(cars));

// 练习3： 使用帮助函数_average重构averageDollarValue，使用函数组合的方式实现。
let _average = function(xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
} // <- 无须改动
let averageDollarValue = function (cars) {
    let dollar_values = fp.map(function(car) {
        return car.dollar_value;
    }, cars)
    return _average(dollar_values)
}

// 解答：
const dollarVallerArr = fp.map((item) => item.dollar_value);

const newAverageDollarValue = fp.flowRight(_average, dollarVallerArr)
console.log('平均价格：', newAverageDollarValue(cars));

// 练习4：使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串， 把数组中的name转换为这种形式：
// 例如： sanitizeNames(['Hello World']) => ['hello_word']

let _underscore = fp.replace(/\W+/g, '_') // <--无须改动， 并在sanitizeNames中使用

// 解答：
// let getCarsNamesArr = fp1.map((item) => item.name);

// const sanitizeNames = fp1.flowRight(_underscore, fp1.map(fp1.toLower), getCarsNamesArr);

const sanitizeNames = fp.flowRight(_underscore, fp.toLower);
console.log('Names转换：',  sanitizeNames(['Hello World']));

/*
 * 三、基于下面提供的代码， 完成后续的四个练习
 */
const fp1 = require('lodash/fp')
const { Container, Maybe} = require( './support')
// 练习1： 使用fn.add(x, y) 和 fp.map(f, x)创建一个能让functor里面的值增加的函数ex1


let ex1 = x => {
    console.log('x:', x);
    return fp1.map((item) => {
        return fp1.add(item, 1)
    }, x)
}

let maybe= Maybe.of([5, 6, 1])
        .map(ex1)
        .map(ex1)

console.log(maybe);

// 练习2： 实现一个函数ex2, 能够使用fp.first获取列表的第一个元素

let ex2 = x => {
    if (Array.isArray(x) && x.length >= 1) {
        return fp1.first(x)
    } else {
        console.log('请确保所传参数为数组，且长度不为0')
        return x
    }
    
}

let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la','ti', 'do'])
            .map(ex2)
            .map(ex2)

console.log(xs);

// 练习3： 实现一个函数ex3, 使用safeProp和fp.first找到user的名字的首字母
let safeProp = fp1.curry(function(x, o) {
    return Maybe.of(o[x])
})

let user = {id: 2, name: 'Albert'}

let ex3 = () => {
    let result = safeProp('name', user)
            .map(x => fp1.first(x)) 
    console.log(result);  
}
ex3()


// 练习4: 使用Maybe重写ex4， 不要有if语句
let ex4 = function(n) {
    if (n) {
        return parseInt
    }
}
let newEx4 = n => {
    let maybeEx4 = Maybe.of(n)
        .map(x => parseInt(x))

    console.log(maybeEx4);   
}
newEx4('4')


// 四、 手写实现 MyPromise 源码

class MyPromise {
    // 构造函数
    constructor (executor) {
        // 会传入一个执行器。
        // 立即调用执行器，如果执行器报错， 则直接reject
        try {
            executor(this.resolve, this.reject)
        } catch (err) {
            this.reject(err)
        }
    }

    // 初始化状态
    status = 'pending'

    // 定义成功调用的值
    value = undefined
    // 定义调用失败的原因
    reason = undefined
    // 定义成功回调存放数组
    successCallback = []
    // 定义失败回调存放数组
    failCallback = []

    // 定义改变成功状态的resolve方法
    resolve = value => {
        // 判断状态是否为等待,不为等待则阻止运行，确保确认状态的固定性。
        if (this.status !== 'panding') return;

        // 改变状态为成功
        this.status = 'fulfilled'
        // 储存成功的值
        this.value = value

         // 判断成功回调是否存在 如果存在 直接调用
        while(this.successCallback.length) {
            this.successCallback.shift()()
        }
    }

    // 定义改变失败状态的reject方法
    reject = reason => {
        // 判断状态是否为等待，不为等待则阻止运行，确保确认状态的固定性。
        if (this.status !== 'panding') return;

        // 改变状态为失败
        this.status = 'rejected'
        // 储存失败的原因
        this.reason = reason

        // 判断失败回调是否存在 如果存在 直接调用
        while(this.failCallback.length) {
            this.failCallback.shift()()
        }
    }

    // 定义then方法
    then (onFulfilled, onRejected) {

        // 解决可选参数问题
        onFulfilled = onFulfilled ? onFulfilled : value => value
        onRejected = onRejected ? onRejected : reason => { throw reason }

        // then方法返回一个Promise
        let thenPromise = new MyPromise((resolve, reject) => {
            // 对状态进行判断
            if (this.status === 'fulfilled') { // 调用成功
                setTimeout(() => {
                    try { // 捕获then中错误
                        // 将同步代码变更为异步代码， 为防止获取不到thenPromise。
                        this.resolvePromise(thenPromise, onFulfilled(this.value), resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
            } else if (this.status === 'rejected') { // 调用失败
                setTimeout(() => {
                    try { // 捕获then中错误
                        // 将同步代码变更为异步代码， 为防止获取不到thenPromise。
                        this.resolvePromise(thenPromise, onRejected(this.reason), resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
            } else (this.status === 'pending') {  // 等待调用
                // 存储成功与失败的回调函数
                this.successCallback.push(() => {
                    setTimeout(() => {
                        try { // 捕获then中错误
                            // 将同步代码变更为异步代码， 为防止获取不到thenPromise。
                            this.resolvePromise(thenPromise, onFulfilled(this.value), resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0)
                });
                this.failCallback.push(() => {
                    setTimeout(() => {
                        try { // 捕获then中错误
                            // 将同步代码变更为异步代码， 为防止获取不到thenPromise。
                            this.resolvePromise(thenPromise, onRejected(this.reason), resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0)
                })
            }
        })
        return thenPromise
    }
    // 定义all方法
    static all (arr) {
        let result = [];
        let index = 0;
        return new MyPromise((resolve, reject) => {
            function add (key, val) { // 定义计数器， 确保所有内容全部执行完毕。
                result[key] = val
                index++
                if(index === arr.length) resolve(result)
            }
            for (let i = 0; i < arr.length; i++) {
                let current = arr[i]
                //判断返回结果为promise对象 还是 普通值
                if (current instanceof MyPromise) {
                    current.then(val => add(i, val), (reason) => reject(reason))
                } else {
                    add(i, arr[i])
                }
            }
        })
    }
    // 定义resolve方法
    static resolve (val) {
        // 判断入参是否是promise对象， 如果是直接返回， 不是则创建一个promise对象返回
        if (val instanceof MyPromise) return val;
        return new MyPromise(resolve => resolve(val))
    }

    // 定义finally方法
    finally (callback) {
        // 不论成功失败， 都调用一次。
        this.then((val) => {
            return MyPromise.resolve(callback()).then(() => val)
        }, (reason) => {
            return MyPromise.resolve(callback()).then(() => {throw reason})
        })
    }

    // 定义catch方法
    catch(failCallback) {
        return this.then(undefined, failCallback)
    }





    resolvePromise (thenPromise, val, resolve, reject) {
        // 判断调用成功返回值是普通值 or Promise对象
        if (thenPromise === val) {
            return reject(new TypeError('promise被循环调用'))
        }
        if (val instanceof MyPromise) { //promise对象
            val.then(resolve, reject)
        } else { //普通值
            resolve(val)
        }
    }
}
















