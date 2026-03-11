import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Tailwind
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import Store from "./Store/index.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
   <Provider store={Store}>
    <GoogleOAuthProvider clientId="723631945241-hr832n1heh14dopkthdovr04si59nb1t.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    <Toaster richColors position='top-right' />
  </Provider>
);