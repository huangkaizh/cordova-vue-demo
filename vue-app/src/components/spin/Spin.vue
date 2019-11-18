<template>
  <div class="ant-spin ant-spin-spinning">
    <span class="ant-spin-dot ant-spin-dot-spin">
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </span>
  </div>
</template>
<script>
const prefixCls = "ivu-spin";

export default {
  name: "Spin"
};
</script>
<style scoped>
@keyframes antRotate {
  to {
    -webkit-transform: rotate(405deg);
    transform: rotate(405deg);
  }
}

@keyframes antSpinMove {
  to {
    opacity: 1;
  }
}

.ant-spin {
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  color: #ff3f40;
  vertical-align: middle;
  text-align: center;
  opacity: 0;
  position: absolute;
  transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  display: none;
}

.ant-spin-spinning {
  display: flex;
  justify-content: center;
  align-items: center;
  background: hsla(0, 0%, 100%, 0.5);
  position: fixed;
  z-index: 99999999999999999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.ant-spin-spinning {
  opacity: 1;
}

.ant-spin-dot-spin {
  z-index: 99999999999999999;
  transform: rotate(45deg);
  animation: antRotate 1.2s linear infinite;
}
.ant-spin-dot {
  position: relative;
  display: inline-block;
  font-size: 20px;
  width: 20px;
  height: 20px;
}
.ant-spin-dot i:first-child {
  left: 0;
  top: 0;
}
.ant-spin-dot i {
  width: 9px;
  height: 9px;
  border-radius: 100%;
  background-color: #ff3f40;
  transform: scale(0.75);
  display: block;
  position: absolute;
  opacity: 0.3;
  animation: antSpinMove 1s linear infinite alternate;
  transform-origin: 50% 50%;
}
.ant-spin-dot i:nth-child(2) {
  right: 0;
  top: 0;
  animation-delay: 0.4s;
}
.ant-spin-dot i:nth-child(3) {
  right: 0;
  bottom: 0;
  animation-delay: 0.8s;
}
.ant-spin-dot i:nth-child(4) {
  left: 0;
  bottom: 0;
  animation-delay: 1.2s;
}
</style>
