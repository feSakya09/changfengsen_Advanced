/**
 *  简答题：
 *  1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
 *  解答： 1)webpack根据配置，找到相应的entry入口文件。
 *        2)以入口文件为起点，通过不同规范（ESM\COMMONJS...）的import / require等, 找出对应的依赖。
 *        3)通过各个文件对应的依赖，整理形成依赖树。递归找到每个节点对应的资源。
 *        4)将不同类型的资源交给各自的loader加载。
 *        5)各个loader将加载结果合并到输出文件。
 *
 *  2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
 *  解答： loader和plugin都是webpack的重要内容，loader作为加载器负责加载解析不同类型的文件, 将非js文件或新规范代码转换通用js代码。
 *        而plugin是负责解决loader无法实现的问题，通过webpack钩子来实现对webpack的扩展功能。
 *        loader开发简单总结为，一个关注转换输入输出的函数，通过数据管道将不同类型的输入内容转换为js代码并返回输出。
 *        plugin开发是通过向webpack提供的各个生命周期钩子中挂载函数或者类(包含apply),来实现功能扩展。
 */
