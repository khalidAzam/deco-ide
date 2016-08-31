export default class {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }

  createUrlParams(params) {
    return Object.keys(params).map(key => {
      return `${key}=${encodeURIComponent(params[key])}`
    }).join('&')
  }

  createUrl(endpoint, params) {
    const {baseUrl} = this
    return `${baseUrl}${endpoint}` + (params ? `?${this.createUrlParams(params)}` : '')
  }

  get(endpoint, params) {
    return fetch(this.createUrl(endpoint, params))
    .then(response => response.json())
  }

  post(endpoint, params, body) {
    return fetch(this.createUrl(endpoint, params), {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(body),
    })
    .then(response => response.json())
  }

  put(endpoint, params, body) {
    return fetch(this.createUrl(endpoint, params), {
      method: 'PUT',
      headers: this.defaultHeaders,
      body: JSON.stringify(body),
    })
  }
}
