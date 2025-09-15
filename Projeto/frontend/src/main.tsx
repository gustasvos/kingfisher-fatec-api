//Ponto de entrada do frontend do react
//Vai renderizar o <App/>
//Configura o React Router
//Envolve o app com os contextos
//Pode aplicar React.StrictMode, ToastContainer, etc

import LoginPage from './modules/administrativo/pages/login-page';
import React from 'react';
import ReactDOM from "react-dom/client";
import "../index.css"


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>
)