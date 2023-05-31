const initialState = {
  genderData: null,
};

const GenderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_GENDER_DATA':
      return {
        ...state,
        genderData: action.payload,
      };
    default:
      return state;
  }
};

export default GenderReducer;
