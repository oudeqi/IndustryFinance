import '../../app.css'
import './win.css'

import { openMsgDetails } from '../../webview.js'

let index = 0
let navs = document.querySelectorAll('#nav .item')

function changeNavIndex (i) {
  api.setFrameGroupIndex({
    name: 'orderFrameGroup',
    index: i,
    reload: false,
    scroll: true
  });
  for (let i = 0; i < navs.length; i++) {
    if (i === index) {
      $api.addCls(navs[i], 'active');
    } else {
      $api.removeCls(navs[i], 'active');
    }
  }
}
apiready = function () {

  // document.querySelector('#msgdetails').onclick = function () {
  //   openMsgDetails()
  // }

  let nav = $api.byId('nav')
  let navPos = $api.offset(nav)
  for (let i = 0; i < navs.length; i++) {
    navs[i].onclick = function () {
      changeNavIndex(i)
    }
  }

  api.openFrameGroup({
    name: 'orderFrameGroup',
    index: index,
    fixedOn: 'ui_window',
    // preload: 3,
    rect: {
      x: 0,
      y:  navPos.h,
      w: 'auto',
      h: 'auto'
    },
    frames: [{
      name: 'html/orderlist/frm/0',
      url: 'widget://html/orderlist/frm0.html',
      bounces: true,
      reload: true,
    }, {
      name: 'html/orderlist/frm/1',
      url: 'widget://html/orderlist/frm1.html',
      bounces: true,
      reload: true,
    }, {
      name: 'html/orderlist/frm/2',
      url: 'widget://html/orderlist/frm2.html',
      bounces: true,
      reload: true,
    }]
  }, function(ret, err) {
    // document.querySelector('#xx').scrollIntoView({
    //   behavior: "instant",
    //   block: "end",
    //   inline: "start"
    // })
    index = ret.index;
    for (let i = 0; i < navs.length; i++) {
      if (i === index) {
        $api.addCls(navs[i], 'active');
      } else {
        $api.removeCls(navs[i], 'active');
      }
    }
  });

}
