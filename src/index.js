import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "slick-carousel/slick/slick.css"; 
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import firebaseConfig from './firebase.confirg';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
     <PersistGate loading="loading" persistor={persistor}>
     <App />
     </PersistGate>
    </Provider>
  </StrictMode>
);
