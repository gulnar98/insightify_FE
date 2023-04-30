import { createContext, useReducer } from "react";

export const MyContext = createContext();

const initialState = {
  isInstalledStep: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setIsInstalledStep":
      var isInstalledStep = true;
      return {
        ...state,
        isInstalledStep,
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
