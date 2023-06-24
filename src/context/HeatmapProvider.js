import { createContext, useReducer } from "react";

export const MyContext = createContext();

const initialState = {
  heatmapsEndpoints: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setHtmpEndpoints":
      var heatmapsEndpoints = [...state.heatmapsEndpoints, action.payload];

      return {
        ...state,
        heatmapsEndpoints,
      };

    default:
      break;
  }
};

function HeatmapProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider value={[state, dispatch]}>
      {children}
    </MyContext.Provider>
  );
}

export default HeatmapProvider;
