export const actionTypes = {
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_NOTIFICATION: 'SET_NOTIFICATION',
};

export const actions = {
  removeNotification: () => ({
    type: actionTypes.REMOVE_NOTIFICATION,
  }),
  setNotification: ({isSuccess, message}) => ({
    type: actionTypes.SET_NOTIFICATION,
    payload: {isSuccess, message},
  }),
};

export const initialState = {
  isSuccess: null,
  message: null,
};

export const notification = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATION:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.REMOVE_NOTIFICATION:
    default:
      return state;
  }
};
