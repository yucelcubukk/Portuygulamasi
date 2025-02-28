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
import { Port } from "../types/portTypes"; // Ortak Port arayüzü

interface PortListProps {
  ports: Port[];
  onEdit: (port: Port) => void;
  onDelete: (port: Port) => void;
}

const PortList: React.FC<PortListProps> = ({ ports, onEdit, onDelete }) => {
  const [filters, setFilters] = React.useState<{ global: { value: string; matchMode: FilterMatchMode } }>({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS }
  });

  const actionBodyTemplate = (rowData: Port) => {
    return (
      <div>
        <Button 
          label="Düzenle" 
          icon="pi pi-pencil" 
          className="p-button-sm p-button-warning" 
          onClick={() => onEdit(rowData)} 
        />

        <Button 
          label="Sil"
          icon="pi pi-trash"
          className="p-button-sm p-button-danger"
          onClick={() => onDelete(rowData)}
        />
      </div>
    );
  };

  return (
    <>
      <InputText
        value={filters.global.value}
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

