//Ponto de entrada do frontend do react
//Vai renderizar o <App/>
//Configura o React Router
//Envolve o app com os contextos
//Pode aplicar React.StrictMode, ToastContainer, etc

import React from 'react';
import ReactDOM from "react-dom/client";
import "../index.css"
import PaginaCadastro from './modules/administrativo/pages/PaginaCadastro.jsx';



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PaginaCadastro />
    <LoginPage />
  </React.StrictMode>
)