type SizeAction = {
  type: string;
  payload: string;
};

const initialState = {
  selected: '',
};

const SizeReducer = (state = initialState, action: SizeAction) => {
  if (action.type === 'ADD_SIZE') {
    return {
      ...state,
      selected: action.payload,
    };
  } else {
    return state;
  }
};

export default SizeReducer;
