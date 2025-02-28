import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";


import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";


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
  ]);

  const [filters, setFilters] = useState<{ global: { value: string | null; matchMode: FilterMatchMode } }>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });



return (
  <>
    <InputText
      value={filters.global.value || ""}
      onChange={(e) => setFilters({ ...filters, global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
      placeholder="Ara..."
      className="p-inputtext-sm mb-3"
    />
    
    <DataTable value={ports} paginator rows={5} filters={filters} filterDisplay="menu">
        <Column field="port_number" header="Port No" sortable filter filterPlaceholder="Ara" />
        <Column field="project_name" header="Proje Adı" sortable filter filterPlaceholder="Ara" />
        <Column field="application_name" header="Uygulama Adı" sortable filter filterPlaceholder="Ara" />
        <Column field="description" header="Açıklama" filter filterPlaceholder="Ara" />
    </DataTable>
  </>
);
 }
export default PortList;
