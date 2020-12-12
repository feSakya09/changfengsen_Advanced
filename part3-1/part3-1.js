/**
 *  1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，
 *  如果不是的话，如何把新增成员设置成响应式数据
 *  ，它的内部原理是什么。
 * */
let vm = new Vue({
    el: '#el',
    data: {
        o: 'object',
        dog: {}
    },
    method: {
        clickHandler () {
            // 该 name 属性是否是响应式的
            this.dog.name = 'Trump'
        }
    }
})

/**
 *  答： 不是响应式数据
 *      1 - 直接再date中定义对象属性
 *      2 - 使用$set方法增加属性值
 *      3 - Object.assign()
 *      4 - ES6 ...运算符深拷贝对象属性
 *
 *
 *      Vue会在初始化实例时对属性进行劫持（setter/getter），所以对象属性必须在data对象上存在才能让Vue将它转换为响应式的。
 * */


/**
 *  2、请简述 Diff 算法的执行过程
 * */

/**
 *  答：  1、调用patch函数，比较新旧节点。
 *       2、判断两节点是否值得比较，不值得比较则用新节点替换旧节点
 *       3、值得比较则执行 patchVnode
 *       4、如果旧节点没有子节点而新节点有，则将旧节点的子节点真实化之后添加到真实DOM，如果两者都有子节点，则执行updateChildren函数比较子节点。
 *
 * */


/**
 *  1\模拟 VueRouter 的 hash 模式的实现，
 * 实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化
 * */

// hash.js

/**
 *  2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
 * */

// ./vue

/**
 *  3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果
 * */

// snabbdom.js



