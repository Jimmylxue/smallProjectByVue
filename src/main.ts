import Vue from "vue";
import Demo from './views/helloworld.vue'
import './assets/index.less'

new Vue({
  el:'#app',
  data:{
    msg:'hello Jimmy'
  },
  components:{
    Demo
  }
})
