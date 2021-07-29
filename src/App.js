import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppLogic from "./AppLogic.js";
import Amplify from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

export default function App() {
  return (
    <BrowserRouter>
      <AppLogic />
    </BrowserRouter>
  );
}
