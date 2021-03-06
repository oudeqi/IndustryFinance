import '../../app.css'
import './frm.css'

import { openTabLayout, openTodoAuthGeren, openTodoAuthQiye } from '../../webview.js'
import { http, openUIInput, resetUIInputPosi, handleLoginSuccess, getAuthStatus } from '../../config.js'
import { Base64 } from 'js-base64'

apiready = function() {

  const UIInput = api.require('UIInput')

  let form = {} // 表单数据
  let type = 'geren' // qiye
  let sendStatus = 'notsend' // notsend:未发送,sending:发送中,countdown:倒计时中
  let submitStatus = 'notsubmit' // notsubmit:未提交,submitting:正在提交

  openUIInput($api.byId('tel'), form, 'tel', { placeholder: '请输入手机号码', keyboardType: 'number', maxStringLength: 11 })
  openUIInput($api.byId('code'), form, 'code', { placeholder: '短信验证码', keyboardType: 'next', maxStringLength: 6 })
  openUIInput($api.byId('pwd'), form, 'pwd', { placeholder: '请输入密码', keyboardType: 'next', inputType: 'password', maxStringLength: 16 })
  openUIInput($api.byId('repwd'), form, 'repwd', { placeholder: '请确认密码', keyboardType: 'done', inputType: 'password', maxStringLength: 16 })

  function login (cb) {
    let body = {
      userType: type === 'geren' ? 1 : 2, // 1个人用户登录，2企业用户登录
      username: form['tel'][1],
      loginType: 1, // 登录方式,1-账密登录，2-验证码登录（企业只能是2）
      // verification: form['code'][1],
      password: Base64.encode(form['pwd'][1]),
      loginDevice: api.deviceId, // 客户手机设备号(android-imei,IOS-??)
      ipAddress: '',
      latitude: '',
      longitude: '',
      terminal_version: api.systemVersion, // 系统终端版本
      location: '', // 最近登录地点
      grant_type: 'password', // 固定传password
      scope: 'app', // 固定传app
      client_id: 'client', // client
      client_secret: 'secret', // 固定传secret
    }
    http.post('/auth/oauth/token', {
      values: body
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      } 
    }).then(ret => {
      cb(ret)
    }).catch(error => {
      api.toast({
        msg: error.msg || '登录失败',
        location: 'middle'
      })
    })
  }

  function resetInputPosi () {
    resetUIInputPosi($api.byId('tel'), form['tel'][0])
    resetUIInputPosi($api.byId('code'), form['code'][0])
    resetUIInputPosi($api.byId('pwd'), form['pwd'][0])
    resetUIInputPosi($api.byId('repwd'), form['repwd'][0])
  }

  function radioOnChange () {
    if (this.dataset.type === 'geren') {
      $api.byId('companyName').style.display = 'none'
      UIInput.hide({id: form['name'][0]})
      type = 'geren'
      resetInputPosi()
    } else {
      $api.byId('companyName').style.display = 'block'
      type = 'qiye'
      setTimeout(() => {
        if (form['name']) {
          UIInput.show({id: form['name'][0]})
        } else {
          openUIInput($api.byId('name'), form, 'name', {
            placeholder: '请输入...',
            isCenterVertical: false,
            maxRows: 2,
            keyboardType: 'next',
            maxStringLength: 40
          })
        }
      }, 150)
      resetInputPosi()
    }
  }

  document.querySelector('#geren').onclick = radioOnChange
  document.querySelector('#qiye').onclick = radioOnChange
  document.querySelector('#agreement').onclick = function () {
    api.alert({
      title: '消息',
      msg: '功能开发中...',
    })
  }

  function countDown () {
    let second = 60
    $api.byId('sendcode').innerHTML = second + '秒后重试'
    let timer = setInterval(() => {
      if (second <= 0) {
        sendStatus = 'notsend'
        $api.byId('sendcode').innerHTML = '发送验证码'
        clearInterval(timer)
      } else {
        second--
        $api.byId('sendcode').innerHTML = second + '秒后重试'
      }
    }, 1000)
  }

  document.querySelector('#sendcode').onclick = function () {
    if (sendStatus === 'notsend') {
      let tel = form['tel'][1]
      if (!tel) {
        return api.toast({ msg: '请输入手机号码', location: 'middle' })
      }
      sendStatus = 'sending'
      $api.byId('sendcode').innerHTML = '正在发送中...'
      http.post('/crpt-cust/sms/smsverificationcode', {
        body: {
          phone: tel
        }
      }).then(ret => {
        sendStatus = 'countdown'
        countDown()
      }).catch(error => {
        api.toast({
          msg: error.msg || '验证码发送失败',
          location: 'middle'
        })
        sendStatus = 'notsend'
        $api.byId('sendcode').innerHTML = '发送验证码'
      })
    }
  }

  document.querySelector('#submit').onclick = function () {
    let personRegister = '/crpt-cust/identification/personregister'
    let enterpriseRegister = '/crpt-cust/identification/enterpriseregister'
    let url = type === 'geren' ? personRegister : enterpriseRegister
    if (submitStatus === 'notsubmit') {
      if (type === 'qiye' && !form['name'][1]) {
        return api.toast({ msg: '请输入企业全称', location: 'middle' })
      }
      if (!form['tel'][1]) {
        return api.toast({ msg: '请输入手机号码', location: 'middle' })
      }
      if (!form['code'][1]) {
        return api.toast({ msg: '请输入验证码', location: 'middle' })
      }
      if (!form['pwd'][1]) {
        return api.toast({ msg: '请输入密码', location: 'middle' })
      }
      if (form['pwd'][1] !== form['repwd'][1]) {
        return api.toast({ msg: '两次密码输入不一致', location: 'middle' })
      }
      if (!$api.byId('checkbox').checked) {
        return api.toast({ msg: '请仔细阅读，并同意协议', location: 'middle' })
      }
      submitStatus = 'submitting'
      let body = {
        phone: form['tel'][1],
        password: Base64.encode(form['pwd'][1]),
        confirmPassword: Base64.encode(form['repwd'][1]),
        verification: form['code'][1]
      }
      if (type === 'qiye') {
        body.name = form['name'][1]
      }
      $api.addCls($api.byId('submit'), 'loading')
      http.post(url, { body }).then(ret => {
        submitStatus = 'notsubmit'
        $api.removeCls($api.byId('submit'), 'loading')
        api.toast({
          msg: '注册成功',
          location: 'middle',
          global: true
        })
        login(function (user) {

          let userinfo = user || {}
          let userType = userinfo.userType
          let token = userinfo.token_type + ' ' + userinfo.access_token
          getAuthStatus(token, function (status) {
            // 认证状态 int
            // 1：正常
            // 2：待实名认证
            // 3：待人脸审核
            // 4：人脸认证失败，待人工审核
            // 5：待补充基本信息
            // 6：人工审核不通过
            handleLoginSuccess(userinfo)
            if (status === 1) {
              openTabLayout()
            } else {
              if (userType === '1') {
                openTodoAuthGeren()
              } else {
                openTodoAuthQiye()
              }
            }
          })
        })
      }).catch(error => {
        api.toast({
          msg: error.msg || '注册失败',
          location: 'middle'
        })
        submitStatus = 'notsubmit'
        $api.removeCls($api.byId('submit'), 'loading')
      })
    }
  }

}
