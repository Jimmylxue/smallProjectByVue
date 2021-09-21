## 从零起步，基于webpack搭建一个适用于小项目的vue脚手架

> 需要对webpack有一定的了解，会更好的掌握和理解的搭建下来

#### 为啥会需要自己搭建呢？

vue的脚手架已经是非常的好用了，为啥还需要再自己搭建呢？

对于我来说，理解和学习一个新的知识最快的方式就是去熟悉API，之后就是类似与研究源码一般，去自己实现它，这个是我对webpack学习成果的一个测验，看看自己对于webpack的理解是否到位。

#### 使用范围

当我们开发一些简单的小型的网站的时候，不涉及很多的功能和接口，使用这种方式开发是最方便的，因为是使用mvvm的开发模式进行开发，还是跟传统的操作DOM的方式要方便太多太多了，而且也非常好操作。

#### 有用到的插件

- Vue

  > 需要使用vue的语法等等

- vue-loader

  > webpack支持.vue文件的格式

- less、less-loader、

  > css预处理方式，更好的编程

- file-loader、url-loader

  > 用于支持静态资源文件的使用，因为webpack默认值只支持.js和.json的文件

- post-css、autoprefixer、cssnano

  > 让css更加强大，自动添加支持浏览器的前缀，压缩css代码等等高阶功能

- babel

  > 让编译js，能读ts，jsES6转ES5等等

所有的东西都在package.json中，一些很简单的就没有提及了。

#### 配置webpack.config.js

```js
const { VueLoaderPlugin } = require('vue-loader')

module.export = {
    module:{
        // 当遇到 .vue结尾的文件时，使用vue-loader进行翻译
        {
            test: /\.vue$/,
            loader: 'vue-loader',
        },
		{
            test: /\.(png|jpe?g|gif)$/i,
            // loader: 'file-loader',
            loader: 'url-loader',
            options: {
                name: '[name]-[hash:6].[ext]',
                publicPath: '../images',
                outputPath: 'images',
                limit: 1024 * 50, //1024等于1K  这里显示的是50k
                // 这个配置非常的重要，因为vue使用的common.js语法规范，而url-loader或者file-loader是使用esmodule的语法规范，这里要关闭esmodule，否则在引入路径的时候是会报错的
    			esModule: false, 
            },
        },    
    },
    
    plugins:[
        // 这个插件一定要引入
        new VueLoaderPlugin(),
    ]
}
```

#### 在开发中使用方式

- 在index.html中创建一个id为app的div

  ```html
  <body>
      <div id="app">
      	<Demo />
      </div>
  </body>
  ```

- 在main.js（入口文件）中引入vue并进行基本配置

  ```js
  import Vue from "vue";
  import Demo from './views/helloworld.vue'
  import './assets/index.less'
  
  new Vue({
    el:'#app',
    data:{
      msg:'helloaaaa'
    },
    components:{
      Demo
    }
  })
  ```

- helloworld.vue中写法（这里就是最基本的组件写法）

  ```vue
  <template>
    <div class="appbody">
      <img src="@/assets/img/demo.jpg" alt="img" />
      <h2 @click="show">xuexue</h2>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {};
    },
    mounted() {
      console.log("render child！！");
    },
    methods: {
      show() {},
    },
  };
  </script>
  
  <style lang="less" scope>
  .appbody {
    width: 100vw;
    height: 100vh;
    background-color: skyblue;
    h2 {
      color: red;
    }
  }
  </style>
  ```

#### 中途遇到过的问题

在引入img标签的时候，打包之后发现页面并没有成功的渲染出img的内容，查看一下发现图片的引入地址并不是正确的地址，编程了src="[object Module]"。找了很久的原因，最后发现是因为 **vue使用的common.js语法规范，而url-loader或者file-loader是使用esmodule的语法规范，这里要关闭esmodule，之后就可以正常的渲染img标签了**

#### 总结：

只要这样基本的配置下来，就可以正常的使用了，今后公司如果安排给我一些小的站点类型的网站，过去我都是采用最原始的使用index.html style.css main.js三个文件，操作DOM，非常的麻烦，有了这个脚手架之后，我今后就使用自己的脚手架进行开发了。

#### 今后要做的事情

- 今后再搭建一个支持react和ts的脚手架，也可以用于创建这种小的单页应用小网站
- 再看看书，把react搞熟了。