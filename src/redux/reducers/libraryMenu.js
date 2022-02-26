const initialStateOne = {
    library: 'Angular',
  };

  function libraryMenuReducer(state = initialStateOne, action)
  {
    switch(action.type) {
      case 'CHANGE':
        return { ...state, library: action.payload };
      default:
        return state;
    }
  }

  export default libraryMenuReducer