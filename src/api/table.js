import request from '@/utils/request'

export function getProject(data) {
  return request({
    url: '/fileService/project/query',
    method: 'post',
    data
  })
}
