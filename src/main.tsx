import ReactDOM from 'react-dom/client'
import App from './App'
import '@styles/index.css'
import { AuthProvider } from '@context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <AuthProvider>
    <App />
  // {/* </AuthProvider>, */}
)
