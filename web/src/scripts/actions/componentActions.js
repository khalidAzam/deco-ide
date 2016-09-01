import DecoClient from '../api/DecoClient'

export const COMPONENTS_FETCH_REQUEST_PENDING = 'COMPONENTS_FETCH_REQUEST_PENDING'
export const COMPONENTS_FETCH_REQUEST_SUCCESS = 'COMPONENTS_FETCH_REQUEST_SUCCESS'
export const COMPONENTS_FETCH_REQUEST_FAILURE = 'COMPONENTS_FETCH_REQUEST_FAILURE'

export const COMPONENT_CREATE_REQUEST_PENDING = 'COMPONENT_CREATE_REQUEST_PENDING'
export const COMPONENT_CREATE_REQUEST_SUCCESS = 'COMPONENT_CREATE_REQUEST_SUCCESS'
export const COMPONENT_CREATE_REQUEST_FAILURE = 'COMPONENT_CREATE_REQUEST_FAILURE'

export const COMPONENT_UPDATE_REQUEST_PENDING = 'COMPONENT_UPDATE_REQUEST_PENDING'
export const COMPONENT_UPDATE_REQUEST_SUCCESS = 'COMPONENT_UPDATE_REQUEST_SUCCESS'
export const COMPONENT_UPDATE_REQUEST_FAILURE = 'COMPONENT_UPDATE_REQUEST_FAILURE'

export const COMPONENT_DELETE_REQUEST_PENDING = 'COMPONENT_DELETE_REQUEST_PENDING'
export const COMPONENT_DELETE_REQUEST_SUCCESS = 'COMPONENT_DELETE_REQUEST_SUCCESS'
export const COMPONENT_DELETE_REQUEST_FAILURE = 'COMPONENT_DELETE_REQUEST_FAILURE'

export const fetchComponents = () => (dispatch) => {
  dispatch({type: COMPONENTS_FETCH_REQUEST_PENDING})

  return DecoClient.getComponents()
  .then(components => dispatch({type: COMPONENTS_FETCH_REQUEST_SUCCESS, payload: components}))
  .catch(() => dispatch({type: COMPONENTS_FETCH_REQUEST_FAILURE}))
}

export const createComponent = () => (dispatch) => {
  dispatch({type: COMPONENT_CREATE_REQUEST_PENDING})

  return DecoClient.createComponent()
  .then(component => {
    dispatch({type: COMPONENT_CREATE_REQUEST_SUCCESS, payload: component})
    return component
  })
  .catch(() => dispatch({type: COMPONENT_CREATE_REQUEST_FAILURE}))
}

export const updateComponent = (component) => (dispatch) => {
  dispatch({type: COMPONENT_UPDATE_REQUEST_PENDING, payload: component})

  return DecoClient.updateComponent(component)
  .then(() => dispatch({type: COMPONENT_UPDATE_REQUEST_SUCCESS, payload: component}))
  .catch(() => dispatch({type: COMPONENT_UPDATE_REQUEST_FAILURE}))
}

export const deleteComponent = (component) => (dispatch) => {
  dispatch({type: COMPONENT_DELETE_REQUEST_PENDING, payload: component})

  return DecoClient.deleteComponent(component)
  .then(() => dispatch({type: COMPONENT_DELETE_REQUEST_SUCCESS, payload: component}))
  .catch(() => dispatch({type: COMPONENT_DELETE_REQUEST_FAILURE}))
}
