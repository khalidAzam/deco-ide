import _ from 'lodash'

// const BASE = 'http://decowsstaging.herokuapp.com'
const BASE = 'http://localhost:8000'

const componentPayload = {
  "name": "Untitled",
  "publisher": "dabbott",
  "schemaVersion": "0.0.3",
  "tags": [],
  "thumbnail": "https://placehold.it/100/100",
  "description": "A React Native component",
  "packageName": "react-native-untitled",
  "tagName": "UntitledComponent",
  "props": [],
  "imports": {
    "react-native": [
      "View"
    ],
  },
  "dependencies": {
    "react-native": "*"
  },
}

class http {
  static defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  static createUrlParams(params) {
    return Object.keys(params).map(key => {
      return `${key}=${encodeURIComponent(params[key])}`
    }).join('&')
  }

  static createUrl(endpoint, params) {
    return `${BASE}${endpoint}` + (params ? `?${this.createUrlParams(params)}` : '')
  }

  static get(endpoint, params) {
    return fetch(this.createUrl(endpoint, params))
    .then(response => response.json())
  }

  static post(endpoint, params, body) {
    return fetch(this.createUrl(endpoint, params), {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(body),
    })
    .then(response => response.json())
  }

  static put(endpoint, params, body) {
    return fetch(this.createUrl(endpoint, params), {
      method: 'PUT',
      headers: this.defaultHeaders,
      body: JSON.stringify(body),
    })
  }
}

class DecoClient {
  static getComponents() {
    return http.get('/components')
    .then(components => {
      return Object.keys(components).map(id => {
        return {id, ...components[id]}
      })
    })
  }

  static createComponent(payload = componentPayload) {
    return http.post('/components', null, payload)
  }

  static updateComponent(payload, id) {
    return http.put(`/components/${id}`, null, payload)
  }
}

export default DecoClient
