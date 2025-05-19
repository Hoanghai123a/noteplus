import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import { UserContext.Provider } from "./components/context/UserContext.jsx";
import "./style/app.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <UserContext.Provider> */}
      <App />
    {/* </UserContext.Provider> */}
  </StrictMode>
);
