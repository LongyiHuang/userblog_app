import request from '../utils/request';


export function verify(option) {
  return request({
    method:'GET',
    url:'/session/verify',
    params:option
  })
}


export function publicKey() {
  return request({
    method:'GET',
    url:'/session/publicKey'
  })
}

export function auth(token) {
  return request({
    method:'GET',
    url:'/session/auth',
    params:{token:token}
  })
}
