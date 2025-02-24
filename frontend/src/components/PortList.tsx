import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

interface Port {
  id: number;
  port_number: number;
  project_name: string;
  application_name: string;
  description: string;
}
const PortList = () => {
    const [ports] = useState<Port[]>([
      { id: 1, port_number: 8080, project_name: "Web Portal", application_name: "App1", description: "Açıklama 1" },
      { id: 2, port_number: 3000, project_name: "React Uygulaması", application_name: "App2", description: "Açıklama 2" }
    ])  ;
  
    const [globalFilter, setGlobalFilter] = useState<string>("");

return (
  <>
    <InputText
      value={globalFilter}
      onChange={(e) => setGlobalFilter(e.target.value)}
      placeholder="Ara..."
      className="p-inputtext-sm mb-3"
    />

    <DataTable value={ports} paginator rows={5} globalFilter={globalFilter}>
      <Column field="port_number" header="Port No" sortable />
      <Column field="project_name" header="Proje Adı" sortable />
      <Column field="application_name" header="Uygulama Adı" sortable />
      <Column field="description" header="Açıklama" />
    </DataTable>
  </>
);
 }
export default PortList;
