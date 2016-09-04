import _ from 'lodash'

import HTTPClient from './HTTPClient'
import PopupUtils from '../utils/PopupUtils'

// const BASE = 'http://decowsstaging.herokuapp.com'
// const BASE = 'http://localhost:8000'
const BASE = 'http://decows.deco.ngrok.io'
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

export default class {
  static getComponents() {
    return http.get('/components')
    .then(components => {
      return Object.keys(components).map(id => {
        return {id, ...components[id]}
      })
    })
  }

  static createComponent(component = defaultComponent) {
    return http.post('/components', null, component)
  }

  static updateComponent(component) {
    const {id} = component

    if (!id) {
      throw new Error('Cannot update component - missing id')
    }

    // Remove id before sending
    const clone = _.cloneDeep(component)
    delete clone.id

    return http.put(`/components/${id}`, null, clone)
  }

  static deleteComponent(component) {
    const {id} = component

    if (!id) {
      throw new Error('Cannot update component - missing id')
    }

    return http.delete(`/components/${id}`)
  }

  static authenticate() {
    const url = http.createUrl('/credentials')

    return PopupUtils.open(url, {
      width: 1060,
      height: 620,
      titleBarStyle: 'default',
      resizable: true,
      scrollbars: true,
    }, (location) => {
      const match = location.match(/code=(.*)/)

      if (match) {
        return {code: match[1]}
      }
    })
  }
}
