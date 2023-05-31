export const ADD_ITEMSDATA = 'ADD_ITEMSDATA';
export const ADD_GENDER = 'ADD_GENDER';
export const ADD_EVENT = 'ADD_EVENT';
export const ADD_NAME = 'ADD_NAME';
export const ADD_DESCRIPTION = 'ADD_DESCRIPTION';
export const ADD_TYPE = 'ADD_TYPE';
export const ADD_OUTFIT = 'ADD_OUTFIT';
const initialState = {
  // itemsData: null,
  CategoryId: null,
  Name: null,
  Description: null,
  subcategoryIds: null,
};
export const ItemsReducer = (
  state = initialState,
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    // case ADD_ITEMSDATA:
    //   return {
    //     ...state,
    //     itemsData: action.payload,
    //   };
    case ADD_NAME:
      return {
        ...state,
        Name: action.payload,
      };
    case ADD_DESCRIPTION:
      return {
        ...state,
        Description: action.payload,
      };
    case ADD_GENDER:
      return {
        ...state,
        CategoryId: action.payload,
      };
    case ADD_EVENT:
      return {
        ...state,
        subcategoryIds: action.payload,
      };
    case ADD_TYPE:
      return {
        ...state,
        subcategoryIds: action.payload,
      };
    case ADD_OUTFIT:
      return {
        ...state,
        subcategoryIds: action.payload,
      };
    default:
      return state;
  }
};
