import request from '../utils/request';


export function fetch(pageNumber,pageSize) {
  const params = {
    pageNumber:pageNumber,
    pageSize:pageSize
  }
  return request({
    method:'GET',
    url:'/article',
    params:params
  });

}

export function fetchOne(id) {
  return request({
    method:'GET',
    url:`/article/${id}`,
  });
}

export function create(article) {
  return request({
    method:'POST',
    url:'/article',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'authToken':localStorage.getItem('authToken')
    },
    data:JSON.stringify(article)
  });
}

export function update(id,article) {
  return request({
    method:'PATCH',
    url:`/article/${id}`,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'authToken':localStorage.getItem('authToken')
    },
    data:JSON.stringify(article)
  });
}


export function remove(id) {
  return request({
    method:'DELETE',
    url:`/article/${id}`,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'authToken':localStorage.getItem('authToken')
    }
  });
}
