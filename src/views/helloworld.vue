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
  // background-color: skyblue;
  h2 {
    color: red;
  }
}
</style>