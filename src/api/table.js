import request from '@/utils/request'
import {getToken} from "@/utils/auth";

export function getProject(data) {
  return request({
    url: '/fileService/project/query',
    method: 'post',
    data,
    headers: {
      'Authorization': getToken(),
      'Group': '1402076358728368129'
    }
  })
}

export function editProject(data) {
  return request({
    url: '/fileService/project/update',
    method: 'post',
    data,
    headers: {
      'Authorization': getToken()
    }
  })
}

export function createProject(data) {
  return request({
    url: '/fileService/project/create',
    method: 'post',
    data
  })
}

export function deleteProject(data) {
  return request({
    url: '/fileService/project/delete',
    method: 'post',
    data
  })
}
