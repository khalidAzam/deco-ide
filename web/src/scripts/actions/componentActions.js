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

export const fetchComponents = () => async (dispatch) => {
  dispatch({type: COMPONENTS_FETCH_REQUEST_PENDING})

  try {
    const components = await DecoClient.getComponents()
    dispatch({type: COMPONENTS_FETCH_REQUEST_SUCCESS, payload: components})
    return components
  } catch (e) {
    dispatch({type: COMPONENTS_FETCH_REQUEST_FAILURE})
    throw e
  }
}

export const createComponent = () => async (dispatch) => {
  dispatch({type: COMPONENT_CREATE_REQUEST_PENDING})

  try {
    const component = await DecoClient.createComponent()
    dispatch({type: COMPONENT_CREATE_REQUEST_SUCCESS, payload: component})
    return component
  } catch (e) {
    dispatch({type: COMPONENT_CREATE_REQUEST_FAILURE})
    throw e
  }
}

export const updateComponent = (component) => async (dispatch) => {
  dispatch({type: COMPONENT_UPDATE_REQUEST_PENDING, payload: component})

  try {
    await DecoClient.updateComponent(component)
    dispatch({type: COMPONENT_UPDATE_REQUEST_SUCCESS, payload: component})
    return component
  } catch (e) {
    dispatch({type: COMPONENT_UPDATE_REQUEST_FAILURE})
    throw e
  }
}

export const deleteComponent = (component) => async (dispatch) => {
  dispatch({type: COMPONENT_DELETE_REQUEST_PENDING, payload: component})

  try {
    await DecoClient.deleteComponent(component)
    dispatch({type: COMPONENT_DELETE_REQUEST_SUCCESS, payload: component})
    return component
  } catch (e) {
    dispatch({type: COMPONENT_DELETE_REQUEST_FAILURE})
    throw e
  }
}
