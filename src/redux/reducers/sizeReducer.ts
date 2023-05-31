const initialState = {
  selected: '',
};
const SizeReducer = (
  state = initialState,
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    case 'ADD_SIZE':
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};
export default SizeReducer;
