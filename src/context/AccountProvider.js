import { createContext, useReducer } from "react";

export const MyContext = createContext();

const initialState = {};

const reducer = (state, action) => {
  return state;
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
