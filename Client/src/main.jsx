import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes.jsx";
import ContextProvider from "./Context/ContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <RouterProvider router={routes}>
      <StrictMode>
        <App />
      </StrictMode>
    </RouterProvider>
  </ContextProvider>
);
