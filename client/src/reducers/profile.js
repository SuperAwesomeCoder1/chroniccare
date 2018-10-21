let defaultState = {
  uid: "",
  first_name: "",
  last_name: "",
  role: "",
  phone: 0
};

const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_FIRST_NAME":
      return { ...state, first_name: action.payload };

    case "CHANGE_LAST_NAME":
      return { ...state, last_name: action.payload };

    case "CHANGE_PHONE":
      return { ...state, phone: action.payload };

    case "CHANGE_UID":
      return { ...state, uid: action.payload };
    case "CHANGE_ROLE":
      return { ...state, role: action.payload };

    default:
      return state;
  }
};

export default profileReducer;
