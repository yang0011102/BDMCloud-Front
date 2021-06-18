import request from '@/utils/request'

import { JSEncrypt } from 'jsencrypt'

export function getVerificationCode(username) {
  return request({
    url: '/user/verificationCode?username=' + username,
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/user/verificationCode?username=' + data.username,
    method: 'get'
  })
    .then(res => {
      console.log(res)
      const jsEncrypt = new JSEncrypt()
      jsEncrypt.setPublicKey(res.data.key)
      console.log('密码明文是' + data.password)
      const encrypted = jsEncrypt.encrypt(data.password)
      console.log('密码密文是' + encrypted)
      data.password = encrypted
    }).catch(e => {
      console.log('错误')
      console.log(e)
    })
    .then(() => {
      console.log(data)
      return request({
        url: '/user/login',
        method: 'post',
        data
      })
    })
  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   data
  // })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
