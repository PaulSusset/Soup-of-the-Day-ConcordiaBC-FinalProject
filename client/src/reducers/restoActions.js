const initialState = { loggedIn: false, currentUser: {} };

const restoActions = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ACCOUNT': {
      console.log(action.accountInfo);
      return { ...state, currentUser: action.accountInfo, loggedIn: true };
    }
    case 'LOG_IN': {
      return { ...state, currentUser: action.account, loggedIn: true };
    }
    case 'LOG_OUT': {
      return { ...state, currentUser: {}, loggedIn: false };
    }
    default: {
      return state;
    }
  }
};

export default restoActions;
