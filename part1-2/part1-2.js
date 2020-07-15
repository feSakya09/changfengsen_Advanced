/*  模块二： ES新特性与TS、JS性能优化
*   
*   简答题
*   一、 请说出下列最终的执行结果， 并解释为什么。
*/
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i)
    }
}
a[6]()

//解答：  a[6]()的结果是10， 因为var声明的变量i在全局作用域中， 当执行a[6]()
//       时，全局作用域中i已循环累加到10

/**
 *  二、 请说出下列最终的执行结果， 并解释为什么。
 ***/
var temp = 123;
if (true) {
    console.log(temp);
    // let temp
}

//解答： 打印undefined, if块级作用域中用let声明的temp不会发生变量提升

/*
*   三、 结合ES6新语法， 用最简单的方式找出数组中的最小值。
*/
var arr = [21, 34, 32, 89, 4]

// 解答
let minVal = Math.min(...arr)
console.log(minVal);


/*
*   四、 请详细说明var, let, const三种声明变量的方式之间的具体差别。
*/

//解答： var声明的变量其作用域为当前上下文所在的函数中， 且存在变量提升问题。
//      let声明的变量其作用域被限制在当前代码块中， 不存在变量提升问题。
//      const类似于let, 但其具有只读属性，在声明时必须进行赋值操作，且一旦赋值后无法更改。

/*
*   五、 请说出下列代码最终输出的结果， 并解释为什么。
*/
var a = 10;
var obj = {
    a: 20,
    fn () {
        setTimeout(() => {
            console.log(this.a)
        })
    }
}
obj.fn()
//解答： 输出20， 因为setTimeout中接收的为箭头函数。箭头函数本身没有this， 其this指向被定义时上下文的this。
//      个人理解为指向其外层最近存在的this，所以此箭头函数的this就是fn的this。
//      普通this指向其被调用对象，所以本题中this指向obj，this.a结果为20


/*
 *  六、简述Symbol类型的用途
*   解答： 
*   1、可以通过Symbol为对象添加一个唯一不重复的key，解决对象属性名重复的问题
*   2、可以实现对象的私有成员。
*/ 

/*
 *   七、说说什么是浅拷贝、什么是深拷贝？
 */
/*
 *   解答： 浅拷贝可以理解为只关注与复制引用对象本身，其内部属性改变时也会引起关联对象的改变。
 *          深拷贝是指不仅仅关注引用对象本身，深拷贝会将引用对象内部所有存在的属性一次递归复制到新对象上，两者无论哪个改变，都不会影响另一个。
 */

 /*
  *   八、请简述Typescript和Javascript之间的关系  
  *
  *   解答： TS是JS的超集，是基于js，用来解决js内部缺陷的语言，在ts内部可以使用原生js，并且ts最终仍然会编译成原生js。  
  * 
  */
  
  /*
  *   九、请谈谈你所认为的ts的优缺点
  *
  *   解答： TS提供了类型系统，很大程度上解决了js作为弱类型语言在类型方面容易出现的错误的问题，并且ts可以对不明显的定义类型做出推断。
  *          TS几乎定义了从简单到复杂的一切类型，包容性也强，即使ts编译报错也可以生成js文件。
  *         缺点---TS需要一定的上手成本，使用TS需要学习接口、类、泛型、枚举类型等一些js中不具备的东西。TS对一些第三方库虽然可以实现兼容，但现阶段兼容性不是特别完美。
  */

/*
 *    十、描述引用计数的工作原理和优缺点  
 *    解答： 引用计数的原理是设置一个引用计数器，通过判断对象身上的引用数是否为0进行判断，如果引用为0，则代表为垃圾数据，会进行回收。
 *           优点： 1、通过引用计数，可以很大程度上避免内存到达上限引发程序暂停。
 *                  2、引用计数对通过对象引用数进行判断，所以可以达到立即回收发现的垃圾数据。
 *           缺点:  1、引用计数无法回收循环引用的对象。
 *                  2、因为引用计数需要随时监控对象身上引用数值的变化，所以需要耗费更多的时间。
 */
  
 /*
  *    十一、描述标记整理算法的工作流程。 
  *     解答：  1、循环遍历所有对象，找到并标记活动对象。
  *             2、整理未标记的对象，进行位置移动，使其内存位置连续起来。
  *              3、清楚未标记的对象。
  */

  /*
   *    十二、 描述V8新生代存储区垃圾回收的流程 
   *    解答：  1、会将V8内存新生代存储区分为两个相等大小的空间，From（使用空间）、To（空闲空间）
   *            2、将所有活动对象存储至From空间
   *             3、进行标记整理操作，将活动对象拷贝到To空间
   *              4、回收释放From空间。
   */

   /*
    *    十三、 描述增量标记算法何时使用及工作原理。 
    *    解答： 会在碎片化垃圾过多，碎片清楚长时间停顿时使用。
    *           将活动对象进行遍历标记，将未标记对象进行移动，形成地址连续的非活动对象进行清理工作。
    */
