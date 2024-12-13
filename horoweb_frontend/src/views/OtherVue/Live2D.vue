<template>
    <div ref="live2dContainer" class="live2d-container"></div>
  </template>
  
  <script>
  export default {
    name: 'Live2DWidget',
    mounted() {
      // 确保在DOM元素挂载后初始化Live2D模型
      this.initLive2DModel();
    },
    methods: {
      initLive2DModel() {
        // 引入L2Dwidget
        const script = document.createElement('script');
        script.src = 'https://equestriacn.com/wp-content/plugins/wp-3d-pony/live2dw/lib/L2Dwidget.min.js';
        script.onload = () => {
          // 配置Live2D模型
          L2Dwidget.init({
            "model": {
              //jsonPath: "https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json",
                //jsonPath: "https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json",
                // jsonPath: "https://unpkg.com/live2d-widget-model-hijiki@1.0.5/assets/hijiki.model.json",
                // jsonPath: 'https://unpkg.com/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json',
                // jsonPath: 'https://unpkg.com/live2d-widget-model-z16@1.0.5/assets/z16.model.json',
                //jsonPath: 'https://unpkg.com/live2d-widget-model-hibiki@1.0.5/assets/hibiki.model.json',
                // jsonPath: 'https://unpkg.com/live2d-widget-model-ni-j@1.0.5/assets/ni-j.model.json',
                //jsonPath: 'https://unpkg.com/live2d-widget-model-nipsilon@1.0.5/assets/nipsilon.model.json',
                // jsonPath: 'https://unpkg.com/live2d-widget-model-nito@1.0.5/assets/nito.model.json',
                // jsonPath: 'https://unpkg.com/live2d-widget-model-tsumiki@1.0.5/assets/tsumiki.model.json',
                // jsonPath: 'https://unpkg.com/live2d-widget-model-unitychan@1.0.5/assets/unitychan.model.json',
                // jsonPath: 'https://unpkg.com/live2d-widget-model-chitose@1.0.5/assets/chitose.model.json',
                //jsonPath: 'https://unpkg.com/live2d-widget-model-haruto@1.0.5/assets/haruto.model.json',
                jsonPath: "https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json",
              "scale": 1
            },
            "display": {
              "position": "left",
              "width": 120,
              "height": 300,
              "hOffset": 0,
              "vOffset": -80 // 修改这里，增加垂直偏移量
            },
            "mobile": {
              "show": false,
              "scale": 0.3
            },
            "react": {
              "opacityDefault": 0.8,
              "opacityOnHover": 0.2
            }
          });
        };
        document.head.appendChild(script);
      }
    }
  }
  </script>
  
  <style>
  .live2d-container {
    /* 根据需要添加样式 */
  }
  </style>
  