import React, { useState } from "react";
import PortList from "./components/PortList";
import PortForm from "./components/PortForm";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Port } from "./types/portTypes"; // Port arayüzünü ortak dosyadan alıyoruz



const App: React.FC = () => {
  const [ports, setPorts] = useState<Port[]>([]);
  const [isDialogVisible, setDialogVisible] = useState(false);

  const addPort = (newPort: Omit<Port, "id">) => {
    setPorts([...ports, { ...newPort, id: ports.length + 1 }]); // Yeni portu ekle
    setDialogVisible(false); // Dialog'u kapat
  };

  return (
    <div className="App">
      <h1>Port Yönetim Uygulaması</h1>
      <Button label="Yeni Port Ekle" icon="pi pi-plus" onClick={() => setDialogVisible(true)} />
      <Dialog header="Port Ekle" visible={isDialogVisible} onHide={() => setDialogVisible(false)} style={{ width: "400px" }}>
        < PortForm onAddPort={addPort} 
  visible={isDialogVisible} 
  onHide={() => setDialogVisible(false)} 
   />
      </Dialog>
      <PortList ports={ports} />
    </div>
  );
};

export default App;
