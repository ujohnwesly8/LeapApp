import {SET_ROLE} from '../actions/actions';

const initialState = {
  role: 'borrower',
};

const Rolereducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ROLE:
      return {
        ...state,
        role: action.role,
      };
    default:
      return state;
  }
};

export default Rolereducer;
