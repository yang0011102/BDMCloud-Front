import request from '@/utils/request'

import { JSEncrypt } from 'jsencrypt'
import { getUserID } from '@/utils/auth'

export function getVerificationCode(username) {
  return request({
    url: '/author/user/verificationCode?username=' + username,
    method: 'get'
  })
}

export function login(data) {
  return getVerificationCode(data.username)
    .then(res => {
      const jsEncrypt = new JSEncrypt()
      jsEncrypt.setPublicKey(res.key)
      data.password = jsEncrypt.encrypt(data.password)
    }).catch(e => {
      console.log(e)
    })
    .then(() => {
      return request({
        url: '/author/user/login',
        method: 'post',
        data
      })
    })
}

export function getInfo() {
  return request({
    url: '/author/userInfo/get?userID=' + String(getUserID()),
    method: 'get'
    // headers: {
    //   'Authorization': getToken()
    // }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
