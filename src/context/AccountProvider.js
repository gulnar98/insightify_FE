import { createContext, useReducer } from "react";

export const MyContext = createContext();

const initialState = {
  isInstalledStep: false,
  daoName: "",
  role: "",
  enterUrl: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setIsInstalledStep":
      var isInstalledStep = true;
      return {
        ...state,
        isInstalledStep,
      };
    case "setDaoName":
      var daoName = action.payload;
      return {
        ...state,
        daoName,
      };
    case "setRole":
      var role = action.payload;
      return {
        ...state,
        role,
      };
    case "setEnterUrl":
      var enterUrl = action.payload;
      return {
        ...state,
        enterUrl,
      };
    default:
      return state;
  }
};

function AccountProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider value={[state, dispatch]}>
      {children}
    </MyContext.Provider>
  );
}

export default AccountProvider;
