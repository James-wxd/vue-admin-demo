// 进行自定义指令的配置
export const imageError = {
  inserted(dom, option) {
    // 自定义指令dom 参数就是我们挂载到dom 对象的值
    // option参数就是我们在自定义指令后面的值
    dom.onerror = function() {
    // 这里处理的意思就是当加载dom 时 数据出错了，那么我们就默认使用option的值
    // 当自定义指令挂载到img 上面的时候，那么dom 就默认时img dom 了
      dom.src = option.value
    }
  }
}
// export 暴露出来的对象写法就相当于这样  module{} 这样的写法

