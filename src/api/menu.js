import request from '@/utils/request'

export function getFirstMenus(params) {
  return request({
    url: '/api/firstMenus',
    method: 'get',
    params
  })
}
export function getMenusByFirstMenuId(params) {
  return request({
    url: '/oauth2/info',
    method: 'get',
    params
  })
}

