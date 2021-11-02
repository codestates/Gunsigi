import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import store from './store/store';
import App from './App';
import ScrollTop from './components/ScrollTop';

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ScrollTop />
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
