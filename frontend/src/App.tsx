import React from 'react';
import PortList from "./components/PortList";
import PortForm from "./components/PortForm";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";



const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Port Yönetim Uygulaması </h1>
      <PortForm/> {/* Formu ekledil */}
      <PortList /> {/* Listeyi tutuyoruz */}
    </div>
  );
};




export default App;
