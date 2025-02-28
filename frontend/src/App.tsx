import React, { useState } from 'react';
import PortList from "./components/PortList";
import PortForm from "./components/PortForm";
import { Button } from "primereact/button";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";



const App: React.FC = () => {
  const [ isDialogVisible, setDialogVisible ] = useState(false);
  return (
    <div className="App">
      <h1>Port Yönetim Uygulaması </h1>

      {/* Butona basılınca açılacak */ }
      <Button label='Yeni Port Ekle ' icon="pi pi-plıus"  onClick={() => setDialogVisible(true)}  />

        {/* PortForm bileşenini açılır pencere içinde göstermek için */}
      < PortForm visible={isDialogVisible} onHide={() => setDialogVisible(false)} />
      
      {/* mevcut port listesini göstermek için */}
      <PortList /> 
    </div>
  );
};




export default App;
