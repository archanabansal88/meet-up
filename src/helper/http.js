const Http = {
  get: (url) => {
    return fetch(url)
  },

  post: (url, body) => {
    return fetch(url, {
      body: JSON.stringify(body),
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}

export default Http
