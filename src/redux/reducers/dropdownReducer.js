const initialState = {
  dropdownValue: 0,
};

function dropdownValue(state = initialState, action) {
  switch(action.type) {
    case 'CHANGE':
      return { ...state, dropdownValue: 1 };
    default:
      return state;
  }
}

export default dropdownValue