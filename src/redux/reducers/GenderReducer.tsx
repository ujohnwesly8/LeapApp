const initialState = {
  genderData: null,
};

const GenderReducer = (state = initialState, action: any) => {
  if (action.type === 'ADD_GENDER_DATA') {
    return {
      ...state,
      genderData: action.payload,
    };
  }

  return state;
};

export default GenderReducer;
