import {SET_ROLE} from '../actions/actions';

const initialState = {
  role: 'borrower',
};

const Rolereducer = (
  state = initialState,
  action: {type: string; role: string},
) => {
  if (action.type === SET_ROLE) {
    return {
      ...state,
      role: action.role,
    };
  }

  return state;
};

export default Rolereducer;
