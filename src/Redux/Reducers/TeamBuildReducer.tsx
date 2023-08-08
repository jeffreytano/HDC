import {
  ActionTypes,
  CHANGE_MEMBER,
  REMOVE_MEMBER,
} from "../Action/TeamBuildAction";



const initialState = {
  Team: [],
};

const EditMember = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case CHANGE_MEMBER:
      console.log("change member");
    case REMOVE_MEMBER:
      console.log("remove member");
    default:
      return state;
  }
};

export default EditMember;