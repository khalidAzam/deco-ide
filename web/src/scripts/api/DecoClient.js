/**
 *    Copyright (C) 2015 Deco Software Inc.
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU Affero General Public License, version 3,
 *    as published by the Free Software Foundation.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import _ from 'lodash'

import HTTPClient from './HTTPClient'
import PopupUtils from '../utils/PopupUtils'

const BASE = 'http://decowsstaging.herokuapp.com'
// const BASE = 'http://localhost:8000'
// const BASE = 'http://decows.deco.ngrok.io'
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
      return components
        .filter(c => c.componentId && c.payload)
        .map(c => ({...c.payload, id: c.componentId}))
    })
  }

  static createComponent(component = defaultComponent, params) {
    return http.post('/components', params, component)
  }

  static updateComponent(component, params) {
    const {id} = component

    if (!id) {
      throw new Error('Cannot update component - missing id')
    }

    // Remove id before sending
    const clone = _.cloneDeep(component)
    delete clone.id

    return http.put(`/components/${id}`, params, clone)
  }

  static deleteComponent(component, params) {
    const {id} = component

    if (!id) {
      throw new Error('Cannot update component - missing id')
    }

    return http.delete(`/components/${id}`, params)
  }

  static me(params) {
    return http.get('/users/me', params)
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
      const match = location.match(/users\/me/)

      if (match) {
        const {access_token} = HTTPClient.parseQueryString(location)
        return access_token
      }
    })
  }
}
