import request from '@/utils/request'

import { JSEncrypt } from 'jsencrypt'
import {getToken, getUserID} from '@/utils/auth'

export function getVerificationCode(username) {
  return request({
    url: '/user/verificationCode?username=' + username,
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
        url: '/user/login',
        method: 'post',
        data
      })
    })
}

export function getInfo() {
  return request({
    url: '/userInfo/get?userID=' + String(getUserID()),
    method: 'get',
    headers: {
      'Authorization': getToken()
    }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
