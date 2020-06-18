/*
 * 一、谈谈你是如何理解JS异步编程的，EventLoop、消息队列都是做什么的， 什么是宏任务， 什么是微任务？
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
let inLastInStock = function (cars) {
    // 获取最后一条数据
    let last_car = fp.last(cars)
    // 获取最后一天数据的 in_stock 属性值
    return fp.prop('in_stock', last_car)
}

console.log(inLastInStock(cars));  


const last_car = fp.last;
const getInStockProp = fp.prop

const inLastInStock1 = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log(inLastInStock1(cars))