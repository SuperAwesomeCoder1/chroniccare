let defaultState = [];

const messagesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return [...state.concat([action.payload])];

    default:
      return state;
  }
};

export default messagesReducer;
