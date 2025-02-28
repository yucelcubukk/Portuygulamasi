import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import * as XLSX from "xlsx";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Port } from "../types/portTypes";
import { FileUpload } from "primereact/fileupload";

interface PortListProps {
  ports: Port[];
  onEdit: (port: Port) => void;
  onDelete: (port: Port) => void;
  onImport: (importedPorts: Port[]) => void;
}

const PortList: React.FC<PortListProps> = ({ ports, onEdit, onDelete, onImport }) => {
  const [filters, setFilters] = React.useState<{ global: { value: string; matchMode: FilterMatchMode } }>({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS }
  });

  const handleFileUpload = (event: { files: File[] }) => {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

      const importedPorts: Port[] = jsonData.map((row, index) => ({
        id: ports.length + index + 1,
        portNumber: row["Port No"],
        projectName: row["Proje Adı"],
        applicationName: row["Uygulama Adı"],
        description: row["Açıklama"],
      }));

      onImport(importedPorts);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleExport = () => {
    if (ports.length === 0) {
      alert("Dışa aktarılacak veri bulunmamaktadır.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(ports.map(({ id, ...rest }) => rest));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Portlar");

    XLSX.writeFile(workbook, "Port_Listesi.xlsx");
  };

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
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <FileUpload mode="basic" accept=".xlsx" chooseLabel="Excel Yükle" customUpload uploadHandler={handleFileUpload} />
        <Button
          label="Excel'e Aktar"
          icon="pi pi-file-excel"
          className="p-button-sm p-button-success"
          onClick={handleExport}
        />
      </div>

      <InputText
        value={filters.global.value}
        onChange={(e) =>
          setFilters({ ...filters, global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })
        }
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


