import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App.tsx"
import AppCopy from "./AppCopy.tsx"

import viteLogo from "./assets/vite.svg"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />

    <AppCopy />

    <img src={viteLogo} className="logo" alt="Vite logo" />
  </React.StrictMode>,
)
