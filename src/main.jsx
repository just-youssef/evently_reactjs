import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StoreProvider from './components/StoreProvider.jsx'
import MUIThemeProvider from './components/MUIThemeProvider.jsx'
import DateProvider from './components/DateProvider.jsx'
import KindeAuthProvider from './components/KindeAuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <MUIThemeProvider>
        <DateProvider>
          <KindeAuthProvider>
            <App />
          </KindeAuthProvider>
        </DateProvider>
      </MUIThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
)
