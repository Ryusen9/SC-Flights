import React, { useState } from "react";
import Context from "./Context";

const ContextProvider = ({ children }) => {
    const [currCurrency, setCurrCurrency] = useState();
  const values = {
    currCurrency, setCurrCurrency
  };
  return <Context.Provider value={values}> {children} </Context.Provider>;
};

export default ContextProvider;
