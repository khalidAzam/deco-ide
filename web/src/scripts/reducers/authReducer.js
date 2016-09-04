/**
 *    Copyright (C) 2015 Deco Software Inat.
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

import { authConstants as at } from '../actions'

const initialState = {
  token: null,
  authPending: false,
}

export default (state = initialState, action) => {
  const {type, payload} = action

  switch(type) {
    case at.AUTH_PENDING: {
      return {...state, authPending: true}
    }

    case at.AUTH_FAILURE: {
      return {...state, authPending: false}
    }

    case at.AUTH_SUCCESS: {
      const {code} = payload
      return {...state, authPending: false, token: code}
    }

    default: {
      return state
    }
  }
}
