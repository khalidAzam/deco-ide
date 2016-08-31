import _ from 'lodash'

import HTTPClient from './HTTPClient'

// const BASE = 'http://decowsstaging.herokuapp.com'
const BASE = 'http://localhost:8000'
const http = new HTTPClient(BASE)

const defaultComponent = {
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

class DecoClient {
  static getComponents() {
    return http.get('/components')
    .then(components => {
      return Object.keys(components).map(id => {
        return {id, ...components[id]}
      })
    })
  }

  static createComponent(payload = defaultComponent) {
    return http.post('/components', null, payload)
  }

  static updateComponent(payload, id) {
    return http.put(`/components/${id}`, null, payload)
  }
}

export default DecoClient
