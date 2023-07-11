import editItemReducer, {
  fetchDataPending,
  fetchDataSuccess,
  fetchDataFailure,
} from '../../../src/redux/slice/editItemSlice';

describe('editItemSlice', () => {
  let initialState:
    | {id: null; data: null; status: string; error: null}
    | undefined;

  beforeEach(() => {
    initialState = {
      id: null,
      data: null,
      status: 'idle',
      error: null,
    };
  });

  it('should return the initial state', () => {
    expect(editItemReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle fetchDataPending', () => {
    const nextState = editItemReducer(initialState, fetchDataPending());
    expect(nextState.status).toEqual('loading');
  });

  it('should handle fetchDataSuccess', () => {
    const data = {id: 1, name: 'Example'};
    const nextState = editItemReducer(initialState, fetchDataSuccess(data));
    expect(nextState.status).toEqual('succeeded');
    expect(nextState.data).toEqual(data);
  });

  it('should handle fetchDataFailure', () => {
    const error = 'Error message';
    const nextState = editItemReducer(initialState, fetchDataFailure(error));
    expect(nextState.status).toEqual('failed');
    expect(nextState.error).toEqual(error);
  });
});
