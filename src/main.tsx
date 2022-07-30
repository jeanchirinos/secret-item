import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.scss'
import '@fontsource/baloo-2'
import AppContext from './context/AppContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </StrictMode>
)
