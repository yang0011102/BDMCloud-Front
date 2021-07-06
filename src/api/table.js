import request from '@/utils/request'

export function getProject(data) {
  return request({
    url: '/fileService/project/query',
    method: 'post',
    data
  })
}

export function editProject(data) {
  return request({
    url: '/fileService/project/update',
    method: 'post',
    data
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
