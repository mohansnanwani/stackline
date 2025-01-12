import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import { store } from './store.ts';  // Import your Redux store
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store} children={undefined}>  {/* Wrap your App component with the Provider and pass the store */}
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
