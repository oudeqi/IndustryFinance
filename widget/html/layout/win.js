// api.lockSlidPane();
/*
list: [{
  text: '',
  iconPath: 'widget://image/tabLayout/index.png',
  selectedIconPath: 'widget://image/tabLayout/index_active.png'
}, {
  text: '订单',
  iconPath: 'widget://image/tabLayout/order.png',
  selectedIconPath: 'widget://image/tabLayout/order_active.png'
}, {
  text: '还款',
  iconPath: 'widget://image/tabLayout/repay.png',
  selectedIconPath: 'widget://image/tabLayout/repay_active.png'
}, {
  text: '我的',
  iconPath: 'widget://image/tabLayout/mine.png',
  selectedIconPath: 'widget://image/tabLayout/mine_active.png'
}],
*/
// 导航布局


function openTabLayout(index) {
  api.openTabLayout({
    name: 'tabLayout',
    bgColor: '#fff',
    reload: true,
    delay: 300,
    slidBackEnabled: false,
    animation: {
      type: 'none'
    },
    navigationBar: {
      hideBackButton: true,
      background: '#1dc4a2',
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold' // leftButtons: [{
      //   // text: '设置',
      //   // color: '#fff',
      //   // fontSize: 16,
      //   iconPath: 'widget://image/avatar.png',
      // }],
      // rightButtons: [{
      //   text: '设置',
      //   color: '#fff',
      //   fontSize: 16,
      //   // iconPath: 'widget://image/settings@2x.png'
      // }]

    },
    tabBar: {
      animated: false,
      scrollEnabled: true,
      selectedColor: '#1dc4a2',
      color: '#bfbfbf',
      index: index || 0,
      // preload: 4,
      list: [{
        text: "首页",
        iconPath: "widget://image/tablayout/shouye.png",
        selectedIconPath: "widget://image/tablayout/shouye_active.png"
      }, {
        text: "订单",
        iconPath: "widget://image/tablayout/dingdan.png",
        selectedIconPath: "widget://image/tablayout/dingdan_active.png"
      }, {
        text: "还款",
        iconPath: "widget://image/tablayout/huankuan.png",
        selectedIconPath: "widget://image/tablayout/huankuan_active.png"
      }, {
        text: "我的",
        iconPath: "widget://image/tablayout/wode.png",
        selectedIconPath: "widget://image/tablayout/wode_active.png"
      }],
      frames: [{
        title: "首页",
        //tab切换时对应的标题
        name: "tablayout/index",
        url: "widget://html/index/frm.html",
        bounces: true,
        reload: true,
        scrollToTop: true //其他继承自openFrame的参数

      }, {
        title: "订单",
        name: "tablayout/order",
        url: "widget://html/order/frm.html",
        bounces: true,
        reload: true,
        scrollToTop: true //其他继承自openFrame的参数

      }, {
        title: "还款",
        name: "tablayout/repay",
        url: "widget://html/repay/frm.html",
        bounces: true,
        reload: true,
        scrollToTop: true //其他继承自openFrame的参数

      }, {
        title: "我的",
        name: "tablayout/my",
        url: "widget://html/my/frm.html",
        bounces: true,
        reload: true,
        scrollToTop: true //其他继承自openFrame的参数

      }]
    }
  });
} // 注册

apiready = function apiready() {
  openTabLayout();

  document.querySelector('#openDrawerPane').onclick = function () {
    api.openDrawerPane({
      type: 'left'
    });
  };

  document.querySelector('#openSlidPane').onclick = function () {
    api.openSlidPane({
      type: 'left'
    });
  };
};
