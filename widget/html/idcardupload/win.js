function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

// api.lockSlidPane();


function openIDcardInfo(pageParam) {
  api.openTabLayout({
    name: 'html/idcardinfo/win',
    title: '确认身份证信息',
    url: 'widget://html/idcardinfo/win.html',
    bgColor: '#fff',
    reload: true,
    pageParam: pageParam,
    bounces: true,
    slidBackEnabled: false,
    navigationBar: {
      hideBackButton: false,
      background: '#1dc4a2',
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold'
    }
  });
} // 人脸认证

// const baseUrl = 'http://crptdev.liuheco.com'
var dev = 'http://crptdev.liuheco.com';
var baseUrl =  dev ;

var ajax = function ajax(method, url) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$headers = _ref.headers,
      headers = _ref$headers === void 0 ? {} : _ref$headers,
      _ref$tag = _ref.tag,
      tag = _ref$tag === void 0 ? null : _ref$tag,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? 15 : _ref$timeout;

  return new Promise(function (resolve, reject) {
    var userinfo = $api.getStorage('userinfo');
    var token = userinfo ? userinfo.token_type + ' ' + userinfo.access_token : '';
    var contentType = {
      'Content-Type': 'application/json;charset=utf-8'
    };
    method === 'upload' ? contentType = {} : null;
    api.ajax({
      url: baseUrl + url,
      method: method === 'upload' ? 'post' : method,
      data: data,
      tag: tag,
      timeout: timeout,
      headers: _objectSpread2({
        'Authorization': token
      }, contentType, {}, headers)
    }, function (ret, error) {
      if (ret) {
        if (ret.code === 200) {
          resolve(ret);
        } else {
          reject(ret);
        }
      } else {
        reject(error);
      }

      {
        if (ret) {
          console.log('/************* SUCCESS. **********/');
        } else {
          console.log('/************* ERROR. ************/');
        }

        console.log('__URL ==> ' + baseUrl + url);
        console.log('__TOKEN ==> ' + token);
        console.log('__BODY ==> ' + JSON.stringify(data));
        console.log('__DATA ==> ' + JSON.stringify(ret || error));
      }
    });
  });
}; // if (ret && ret.statusCode === 500 && ret.body.code === 216) {
//   api.toast({
//     msg: '登录状态已经过期，请重新登录！',
//     duration: 2000,
//     location: 'middle'
//   })
// }


var http = {
  cancel: function cancel(tag) {
    return api.cancelAjax({
      tag: tag
    });
  },
  get: function get(url, data) {
    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        headers = _ref2.headers,
        tag = _ref2.tag,
        timeout = _ref2.timeout;

    return ajax('get', url, data, {
      headers: headers,
      tag: tag,
      timeout: timeout
    });
  },
  post: function post(url, data) {
    var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        headers = _ref3.headers,
        tag = _ref3.tag,
        timeout = _ref3.timeout;

    return ajax('post', url, data, {
      headers: headers,
      tag: tag,
      timeout: timeout
    });
  },
  put: function put(url, data) {
    var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        headers = _ref4.headers,
        tag = _ref4.tag,
        timeout = _ref4.timeout;

    return ajax('put', url, data, {
      headers: headers,
      tag: tag,
      timeout: timeout
    });
  },
  "delete": function _delete(url, data) {
    var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        headers = _ref5.headers,
        tag = _ref5.tag,
        timeout = _ref5.timeout;

    return ajax('delete', url, data, {
      headers: headers,
      tag: tag,
      timeout: timeout
    });
  },
  upload: function upload(url, data) {
    var _ref6 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        headers = _ref6.headers,
        tag = _ref6.tag,
        timeout = _ref6.timeout;

    return ajax('upload', url, data, {
      headers: headers,
      tag: tag,
      timeout: timeout
    });
  }
}; // 统一ios和android的输入框，下标都从0开始

function openActionSheet(title, buttons, cb) {
  api.actionSheet({
    title: title,
    cancelTitle: '取消',
    buttons: buttons
  }, function (ret, err) {
    var index = ret.buttonIndex; // index 从1开始

    if (index !== buttons.length + 1) {
      cb(index - 1);
    }
  });
}

function getPicture(sourceType, cb) {
  // library         //图片库
  // camera          //相机
  // album           //相册
  api.getPicture({
    sourceType: sourceType,
    encodingType: 'png',
    mediaValue: 'pic',
    destinationType: 'file',
    allowEdit: true,
    quality: 100,
    targetWidth: 400,
    targetHeight: 300,
    saveToPhotoAlbum: false
  }, cb);
}

apiready = function apiready() {
  var userinfo = $api.getStorage('userinfo');
  var name = userinfo.name,
      userType = userinfo.userType;
  $api.byId('name').innerHTML = name;

  if (userType === '1') {
    // userType === '1' ? '个人账号' : '企业账号'
    $api.byId('userType').innerHTML = '';
  } else {
    $api.byId('userType').innerHTML = '法定代表人';
  }

  var front = '';
  var back = '';
  var submitStatus = 'notsubmit'; // notsubmit:未提交,submitting:正在提交

  document.querySelector('#front').onclick = function () {
    var btns = ['相机', '相册'];
    var sourceType = '';
    openActionSheet('请选择', btns, function (index) {
      if (index === 0) {
        sourceType = 'camera';
      } else {
        sourceType = 'album';
      }

      getPicture(sourceType, function (ret, err) {
        if (ret) {
          $api.dom($api.byId('front'), 'img').src = ret.data;
          front = ret.data;
        }
      });
    });
  };

  document.querySelector('#back').onclick = function () {
    var btns = ['相机', '相册'];
    var sourceType = '';
    openActionSheet('请选择', btns, function (index) {
      if (index === 0) {
        sourceType = 'camera';
      } else {
        sourceType = 'album';
      }

      getPicture(sourceType, function (ret, err) {
        if (ret) {
          $api.dom($api.byId('back'), 'img').src = ret.data;
          back = ret.data;
        }
      });
    });
  }; // let idcard = {
  //   "code":200,
  //   "msg":"",
  //   "data":{
  //     "name":"周永刚",
  //     "gender":"男",
  //     "number":"622424199409270411",
  //     "birthday":"1994-09-27",
  //     "address":"甘肃省通渭县平襄镇瓦石村高家庄社45号",
  //     "nation":"汉",
  //     "authority":"通渭县公安局",
  //     "timelimit":"20110125-20210125"
  //   }
  // }


  document.querySelector('#next').onclick = function () {
    // openIDcardInfo()
    if (submitStatus === 'notsubmit') {
      if (!front) {
        return api.toast({
          msg: '请选择身份证正面'
        });
      }

      if (!back) {
        return api.toast({
          msg: '请选择身份证反面'
        });
      }

      submitStatus = 'submitting';
      $api.addCls($api.byId('next'), 'loading');
      http.upload('/crpt-cust/saas/ocr', {
        files: {
          certImageFront: front,
          certImageBack: back
        }
      }).then(function (ret) {
        submitStatus = 'notsubmit';
        $api.removeCls($api.byId('next'), 'loading');
        openIDcardInfo(_objectSpread2({}, ret.data, {
          front: front,
          back: back
        }));
      })["catch"](function (error) {
        api.toast({
          msg: error.msg || '网络错误'
        });
        submitStatus = 'notsubmit';
        $api.removeCls($api.byId('next'), 'loading');
      });
    }
  };
};
