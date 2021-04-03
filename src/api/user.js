import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/oauth2/login',
    method: 'post',
    params
  })
}

// export function getInfo(token) {
export function getInfo(params) {
  return request({
    url: '/oauth2/info',
    method: 'get',
    params
    // ,
    // params: { access_token: token }
  })
}

export function logout(token) {
  return request({
    url: '/oauth2/logout1',
    method: 'post',
    params: {token}

  })
}

export function getPublicKey() {
  return request({
    url: '/oauth2/getPublicKey',
    method: 'get',
  })
}


export function getCaptcha(params) {
  return request({
    url: '/oauth2/captcha.jpg',
    method: 'get',
    params
  })
}



