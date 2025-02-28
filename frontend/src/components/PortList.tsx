import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Port } from "../types/portTypes"; // PortList için ortak arayüzü kullan

interface PortListProps {
  ports: Port[]; // App.tsx içinden gelen port listesini almak için props tanımladık
  onEdit: (port: Port) => void; // Düzenleme işlemi için gerekli fonksiyon
}

const PortList: React.FC<PortListProps> = ({ ports, onEdit }) => {
  const [filters, setFilters] = React.useState<{ global: { value: string | null; matchMode: FilterMatchMode } }>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });

  // Her satırın yanına "Düzenle" butonu eklemek için fonksiyon
  const actionBodyTemplate = (rowData: Port) => {
    return (
      <Button 
        label="Düzenle" 
        icon="pi pi-pencil" 
        className="p-button-sm p-button-warning" 
        onClick={() => onEdit(rowData)} 
      />
    );
  };

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
        <Column header="İşlemler" body={actionBodyTemplate} />
      </DataTable>
    </>
  );
};

export default PortList;
