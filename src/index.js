import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { store, Persistor } from './state/store';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Provider store={store}>
    <AnimatePresence>
      <BrowserRouter>
        <PersistGate loading={null} persistor={Persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </AnimatePresence>
  </Provider>
);



