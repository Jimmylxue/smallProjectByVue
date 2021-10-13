<template>
  <div class="appbody">
    <button @click="getaddress">获取地址信息</button>
    <img src="@/assets/img/demo.jpg" alt="img" />
    <h2 @click="show">xuexue</h2>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {};
  },
  mounted() {
    console.log("render child！！",wx);
    this.connectWx()
  },
  methods: {
    show() {},
    async connectWx(){
      let url = encodeURIComponent(location.href.split('#')[0])
      let response = await axios.post('http://1.116.204.114:667/wx',{url})
      let res = response.data
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature,// 必填，签名
        jsApiList: [
          'getLocation'
        ] // 必填，需要使用的JS接口列表
      });
      wx.ready((res) => {
        // 如果需要定制ready回调方法
        console.log('结果',res)
      });
    },
    getaddress(){
      console.log(wx)
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度
          console.log('地理位置',res)
        }
      });
    }
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