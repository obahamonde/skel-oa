import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import '@unocss/reset/tailwind.css'
import './styles/main.scss'
import 'uno.css'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
