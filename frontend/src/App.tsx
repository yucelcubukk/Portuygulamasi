import React, { useState } from "react";
import PortList from "./components/PortList";
import PortForm from "./components/PortForm";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Port } from "./types/portTypes"; // Port tipi buradan alınıyor

const App: React.FC = () => {
  const [ports, setPorts] = useState<Port[]>([]);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [editingPort, setEditingPort] = useState<Port | null>(null);

  const addPort = (newPort: Omit<Port, "id">) => {
    setPorts([...ports, { ...newPort, id: ports.length + 1 }]); // Yeni portu ekle
    setDialogVisible(false);
  };

  const updatePort = (updatedPort: Port) => {
    setPorts(ports.map((port) => (port.id === updatedPort.id ? updatedPort : port))); // Güncellenen portu listeye ekle
    setEditingPort(null); // Düzenleme işlemi bitti, pencereyi kapat
  };

  return (
    <div className="App">
      <h1>Port Yönetim Uygulaması</h1>
      
      {/* Yeni port ekleme butonu */}
      <Button label="Yeni Port Ekle" icon="pi pi-plus" onClick={() => setDialogVisible(true)} />

      {/* Port ekleme formu */}
      <PortForm onAddPort={addPort} visible={isDialogVisible} onHide={() => setDialogVisible(false)} />

      {/* Port güncelleme formu */}
      {editingPort && (
        <PortForm port={editingPort} onUpdatePort={updatePort} visible={!!editingPort} onHide={() => setEditingPort(null)} />
      )}

      {/* Port listesi */}
      <PortList ports={ports} onEdit={(port) => setEditingPort(port)} />
    </div>
  );
};

export default App;

