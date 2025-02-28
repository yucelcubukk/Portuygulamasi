import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Port } from "../types/portTypes"; // PortList için ortak arayüzü kullan


interface PortListProps {
  ports: Port[]; // App.tsx içinden gelen port listesini almak için props tanımladık
}


const PortList: React.FC<PortListProps> = ({ ports }) => {
  const [filters, setFilters] = React.useState<{ global: { value: string | null; matchMode: FilterMatchMode } }>({
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
  <Column field="portNumber" header="Port No" sortable filter filterPlaceholder="Ara" />
  <Column field="projectName" header="Proje Adı" sortable filter filterPlaceholder="Ara" />
  <Column field="applicationName" header="Uygulama Adı" sortable filter filterPlaceholder="Ara" />
  <Column field="description" header="Açıklama" filter filterPlaceholder="Ara" />

      </DataTable>
    </>
  );
};

export default PortList;

