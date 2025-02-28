import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Port } from "../types/portTypes"; // Port arayüzünü ortak dosyadan alıyoruz

// 📌 Props tanımlandı!
interface PortFormProps {
  onAddPort: (port: Omit<Port, "id">) => void;
  visible: boolean;
  onHide: () => void;
}

const PortForm: React.FC<PortFormProps> = ({ onAddPort, visible, onHide }) => {
  const initialValues = {
    portNumber: "",
    projectName: "",
    applicationName: "",
    description: "",
  };

  const validationSchema = Yup.object({
    portNumber: Yup.string().required("Port numarası zorunludur"),
    projectName: Yup.string().required("Proje adı zorunludur"),
    applicationName: Yup.string().required("Uygulama adı zorunludur"),
    description: Yup.string(),
  });

  return (
    <Dialog header="Port Ekle" visible={visible} onHide={onHide} style={{ width: "400px" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onAddPort(values); // 📌 Form verisini App.tsx'e gönderecek!
          resetForm(); // Formu temizle
          onHide(); // Formu kapat
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Port Numarası:</label>
              <Field type="text" name="portNumber" className="p-inputtext" />
              <ErrorMessage name="portNumber" component="div" className="p-error" />
            </div>

            <div>
              <label>Proje Adı:</label>
              <Field type="text" name="projectName" className="p-inputtext" />
              <ErrorMessage name="projectName" component="div" className="p-error" />
            </div>

            <div>
              <label>Uygulama Adı:</label>
              <Field type="text" name="applicationName" className="p-inputtext" />
              <ErrorMessage name="applicationName" component="div" className="p-error" />
            </div>

            <div>
              <label>Açıklama:</label>
              <Field as="textarea" name="description" className="p-inputtext" />
              <ErrorMessage name="description" component="div" className="p-error" />
            </div>

            <Button type="submit" label="Ekle" className="p-button-primary" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default PortForm;
