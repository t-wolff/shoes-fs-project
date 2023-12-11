import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ShoeProvider } from './context/ShoeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShoeProvider>
      <App />
    </ShoeProvider>
  </React.StrictMode>,
)
