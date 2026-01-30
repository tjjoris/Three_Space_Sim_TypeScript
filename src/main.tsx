import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('app')
if (!container) throw new Error('Could not find #app container in index.html')

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
