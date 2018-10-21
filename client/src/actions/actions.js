export const changeUID = uid => {
  return {
    type: "CHANGE_UID",
    payload: uid
  };
};

export const changeFirstName = firstName => {
  return {
    type: "CHANGE_FIRST_NAME",
    payload: firstName
  };
};

export const changeRole = role => {
  return {
    type: "CHANGE_ROLE",
    payload: role
  };
};

export const changeLastName = lastName => {
  return {
    type: "CHANGE_LAST_NAME",
    payload: lastName
  };
};

export const changePhone = phone => {
  return {
    type: "CHANGE_PHONE",
    payload: phone
  };
};

export const addMessage = message => {
  return {
    type: "ADD_MESSAGE",
    payload: message
  };
};
