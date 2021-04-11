export const createReducer = <T>(type: string, initState: T) => (state = initState, action: any) => {
  switch (action.type) {
    case type:
      return action.payload;
    default:
      return state;
  }
};
