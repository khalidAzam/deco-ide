import DecoClient from '../api/DecoClient'

export const at = {
  AUTH_PENDING: 'AUTH_PENDING',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
}

export const authenticate = () => async (dispatch) => {
  dispatch({type: at.AUTH_PENDING})

  try {
    const result = await DecoClient.authenticate()
    dispatch({type: at.AUTH_SUCCESS, payload: result})
    return result
  } catch (e) {
    dispatch({type: at.AUTH_FAILURE})
    throw e
  }
}
