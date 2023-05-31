export const ADD_ORDER = 'ADD_ORDER';

export const Orderreducer = (razorpay: string) => {
  return {
    type: ADD_ORDER,
    payload: razorpay,
  };
};
