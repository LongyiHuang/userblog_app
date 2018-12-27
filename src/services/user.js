import request from '../utils/request';


export function signup(user) {
  return request({
    method:'POST',
    url:'/user/signup',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
    data:JSON.stringify(user)
  });
}

export function login(user,verifyToken,authToken) {
  return request({
    method:'POST',
    url:'/user/login',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'verifyToken': verifyToken,
      'authToken':authToken
    },
    data:JSON.stringify(user)
  });
}

export function logout(authToken) {
  return request({
    method:'POST',
    url:'/user/logout',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'authToken':authToken
    },
  });
}
