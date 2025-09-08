import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import { TourProvider } from "./components/tour/TourContext";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <Provider store={store}>
        <TourProvider>
    <RouterProvider router={router} />
    </TourProvider>
    </Provider>
  </React.StrictMode>
);