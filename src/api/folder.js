import request from '@/utils/request'

export function createFileList(data) {
  return request({
    url: '/fileService/folder/createFileList',
    method: 'post',
    data
  })
}

export function updateFileList(data) {
  return request({
    url: '/fileService/folder/updateFileList',
    method: 'post',
    data
  })
}

export function deleteFileList(data) {
  return request({
    url: '/fileService/folder/deleteFileList',
    method: 'post',
    data
  })
}

export function queryFileList(data) {
  return request({
    url: '/fileService/folder/queryFileList',
    method: 'post',
    data
  })
}

export function queryFolder(data) {
  return request({
    url: '/fileService/folder/query',
    method: 'post',
    data
  })
}
export function deleteFolder(data) {
  return request({
    url: '/fileService/folder/delete',
    method: 'post',
    data
  })
}

export function updateFolder(data) {
  return request({
    url: '/fileService/folder/update',
    method: 'post',
    data
  })
}

export function createFolder(data) {
  return request({
    url: '/fileService/folder/create',
    method: 'post',
    data
  })
}

