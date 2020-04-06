export const actionTypes = {
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_NOTIFICATION: 'SET_NOTIFICATION',
};

export const actions = {
  removeNotification: () => ({
    type: actionTypes.REMOVE_NOTIFICATION,
  }),
  setNotification: ({isSuccess, message, description}) => ({
    type: actionTypes.SET_NOTIFICATION,
    payload: {isSuccess, message, description},
  }),
};

export const initialState = {
  isSuccess: null,
  message: null,
  description: null,
};

export const notification = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATION:
      return {
        ...state,
        isSuccess: action.payload.isSuccess,
        message: action.payload.message,
        description: action.payload.description,
      };
    case actionTypes.REMOVE_NOTIFICATION:
    default:
      return state;
  }
};
