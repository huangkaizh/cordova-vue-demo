<template>
  <div id="app">
    <img
      class="logo"
      src="./assets/logo.png"
    ></img>
    <div>{{devicePlatform}}</div>
    <button @click="login">登录</button>
    <button @click="getDeskList">getDeskList</button>
    <button @click="wsConnect">wsConnect</button>
    <button @click="wsSend">wsSend</button>
    <button @click="wsClose">wsClose</button>
    <button @click="getPicture">拍照</button>
    <button @click="takeFromGalery">从相册选取</button>
    <button @click="bluetooth">蓝牙</button>
    <div>{{'蓝牙状态：' + bluetoothEnabled}}</div>
    <button @click="scan">蓝牙扫描</button>
    <button @click="wifi">wifi</button>
    <button @click="udp">初始化udp</button>
    <button @click="udpSend">udp发送消息</button>
    <img id="myImage"></img>
    <router-view />
  </div>
</template>

<script>
// ArrayBuffer转为字符串，参数为ArrayBuffer对象
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

// 字符串转为ArrayBuffer对象，参数为字符串
function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export default {
  name: "App",
  data() {
    return {
      webSocketId: null,
      devicePlatform: null,
      bluetoothEnabled: null,
      serverSocketId: null,
      clientSocketId: null
    };
  },
  methods: {
    udpSend() {
      chrome.sockets.udp.send(this.clientSocketId, str2ab("hello"), "0.0.0.0", 9000, res => {
        console.log("send res", res);
      });
    },
    closeUDPService() {
      // close the socket
      if (typeof chrome.sockets !== "undefined") {
        chrome.sockets.udp.onReceive.removeListener("onReceive");
        chrome.sockets.udp.onReceiveError.removeListener("onReceiveError");
        chrome.sockets.udp.close(this.serverSocketId);
        chrome.sockets.udp.close(this.clientSocketId);
      }
      // close the stream
      this.udpstream.complete();
    },
    udp() {
      console.log("udp");
      console.log("chrome.sockets.udp", chrome.sockets.udp);
      this.initServerSocket();
      this.initClientSocket();
    },
    initClientSocket() {
      chrome.sockets.udp.create({}, createInfo => {
        console.log("createInfo", createInfo);
        this.clientSocketId = createInfo.socketId;
        chrome.sockets.udp.bind(
          this.clientSocketId,
          "0.0.0.0",
          9001,
          bindRes => {
            console.log("bindRes", bindRes);
          }
        );
      });
    },
    initServerSocket() {
      chrome.sockets.udp.create({}, createInfo => {
        console.log("createInfo", createInfo);
        this.serverSocketId = createInfo.socketId;
        chrome.sockets.udp.bind(
          this.serverSocketId,
          "0.0.0.0",
          9000,
          bindRes => {
            console.log("bindRes", bindRes);
          }
        );
      });
      chrome.sockets.udp.onReceive.addListener(info => {
        console.log("received info", info);
        console.log("received info.data", ab2str(info.data));
      });
    },
    wifi() {
      const wifiScan = WifiWizard2.scan().then(
        successRes => {
          console.log("scan successRes", successRes);
          console.log("wifiScan", wifiScan);
          WifiWizard2.getConnectedSSID().then(
            successRes => {
              console.log("getConnectedSSID successRes", successRes);
            },
            errorRes => {
              console.log("getConnectedSSID errorRes", errorRes);
            }
          );
          WifiWizard2.getConnectedBSSID().then(
            successRes => {
              console.log("getConnectedBSSID successRes", successRes);
            },
            errorRes => {
              console.log("getConnectedBSSID errorRes", errorRes);
            }
          );
        },
        errorRes => {
          console.log("scan errorRes", errorRes);
        }
      );
    },
    scan() {
      // Start scanning. Two callback functions are specified.
      evothings.ble.startScan(onDeviceFound, onScanError);

      // This function is called when a device is detected, here
      // we check if we found the device we are looking for.
      function onDeviceFound(device) {
        if (device.name) {
          console.log("device", device);
        }
      }

      // Function called when a scan error occurs.
      function onScanError(error) {
        console.log("Scan error: " + error);
      }

      setTimeout(() => {
        evothings.ble.stopScan();
      }, 5000);
    },
    bluetooth() {
      console.log("bluetoothle", ble);
      console.log("bluetoothle.initialize", ble.enable);
      ble.enable(
        successRes => {
          console.log("Bluetooth is enabled", successRes);
          this.bluetoothEnabled = true;
        },
        errorRes => {
          console.log("The user did *not* enable Bluetooth", errorRes);
          this.bluetoothEnabled = false;
        }
      );
    },
    takeFromGalery() {
      function onCameraSuccess(imageURL) {
        console.log("onCameraSuccess:" + imageURL);
        var image = document.getElementById("myImage");
        image.src = "data:image/jpeg;base64," + imageURL;
      }

      function onCameraError(e) {
        console.log("onCameraError:" + e);
      }
      var cameraOptions = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM, //相册类型
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        // targetWdith: 100,
        // targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
      console.log("调用相册接口");
      navigator.camera.getPicture(
        onCameraSuccess,
        onCameraError,
        cameraOptions
      );
    },
    getPicture() {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
      });

      function onSuccess(imageData) {
        var image = document.getElementById("myImage");
        image.src = "data:image/jpeg;base64," + imageData;
      }

      function onFail(message) {
        alert("Failed because: " + message);
      }
    },
    wsSend() {
      CordovaWebsocketPlugin.wsSend(this.webSocketId, "Hello World!");
    },
    wsClose() {
      CordovaWebsocketPlugin.wsClose(this.webSocketId, 1000, "done");
    },
    wsConnect() {
      var accessToken = "abcdefghiklmnopqrstuvwxyz";
      var wsOptions = {
        url: "wss://echo.websocket.org",
        timeout: 5000,
        pingInterval: 10000,
        headers: { Authorization: "Bearer " + accessToken },
        acceptAllCerts: false
      };

      const that = this;

      CordovaWebsocketPlugin.wsConnect(
        wsOptions,
        function(recvEvent) {
          // console.log("recvEvent", recvEvent);
          // console.log(
          //   "Received callback from WebSocket: " + recvEvent["callbackMethod"]
          // );
          console.log("recvEvent.message from server", recvEvent.message);
        },
        function(success) {
          console.log("Connected to WebSocket with id: " + success.webSocketId);
          that.webSocketId = success.webSocketId;
          console.log("that.webSocketId", that.webSocketId);
        },
        function(error) {
          console.log(
            "Failed to connect to WebSocket: " +
              "code: " +
              error["code"] +
              ", reason: " +
              error["reason"] +
              ", exception: " +
              error["exception"]
          );
        }
      );
    },
    getDeskList() {
      this.$store.dispatch("getDeskList", {});
    },
    login() {
      this.$store.dispatch("login", {
        username: "admin",
        password: "admin123",
        rememberMe: true
      });
    }
  },
  created() {
    this.devicePlatform = window.cordova.platformId;
  },
  mounted() {
    console.log("hello, world, huangzhi!");

    console.log("window.cordova", window.cordova);
    const that = this;
    document.addEventListener(
      "deviceready",
      () => {
        console.log("Cordova : device is ready !");
        console.log("cordova :", window.cordova);
        console.log("CordovaWebsocketPlugin :", window.CordovaWebsocketPlugin);
      },
      () => {
        console.log("deviceready fail");
      }
    );
  },
  beforeDestroy() {
    this.closeUDPService();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<style scoped>
.logo {
  width: 100px;
  height: 100px;
}
#myImage {
  width: 100%;
  height: auto;
}
</style>

