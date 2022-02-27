const initialState = {
    library: 'angular',
  };

  function libraryMenuReducer(state = initialState, action)
  {
    switch(action.type) {
      case 'CHANGE':
        return { ...state, library: action.payload };
      default:
        return state;
    }
  }

  export default libraryMenuReducer