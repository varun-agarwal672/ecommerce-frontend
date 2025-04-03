const initialState = {
    isAuthenticated: false,
    // other auth-related state
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AUTHENTICATED':
        return {
          ...state,
          isAuthenticated: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  