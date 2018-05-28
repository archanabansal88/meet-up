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
  },
  postFile: (url, body) => {
    return fetch(url, {
      body: JSON.stringify(body),
      mode: 'no-cors',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'type': 'formData'
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
