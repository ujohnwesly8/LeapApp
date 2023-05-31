const initialState = {
  selectedEvent: null,
  selectedOutfit: null,
};
export default function eventReducer(
  state = initialState,
  action: {type: any; payload: any},
) {
  switch (action.type) {
    case 'SELECT_EVENT':
      return {
        ...state,
        selectedEvent: action.payload,
      };
    case 'SELECT_OUTFIT':
      return {
        ...state,
        selectedOutfit: action.payload,
      };
    default:
      return state;
  }
}
