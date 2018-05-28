const Http = {
  get: (url) => {
    return fetch(url)
  },

  post: (url, body, type = 'application/json') => {
    return fetch(url, {
      body: body,
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'content-type': type
      }
    })
  },
  delete: (url, body) => {
    return fetch(url, {
      body: JSON.stringify(body),
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}

export default Http
