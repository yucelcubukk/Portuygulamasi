import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const PortForm: React.FC<{visible: boolean; onHide: () => void  }> = ({ visible, onHide}) => { 
    const initialValues = {
        portNumber: "",
        projectName: "",
        applicationName: "",
        description: "",
    };

    const validationSchema = Yup.object({
        portNumber: Yup.number()
              .typeError("Port numarası sayı olmalıdır")
              .required("Port numarası zorunludur"),
              projectName: Yup.string().required("Uygulama adı zorunludur"),
              description: Yup.string()
    });


    const handleSubmit = (values: typeof initialValues) =>{
        console.log("Form verileri: ", values);
        onHide();
    };


    return (
        <Dialog header="Port Ekle" visible={visible} onHide={onHide} style= {{width: "400px" }}>
            <Formik initialValues={initialValues} validationSchema={validationSchema}  onSubmit={handleSubmit}>
                { ( { isSubmitting }) => (
                    <Form>
                        <div className="p-field">
                            <label>Port Numarası: </label>
                            <Field type="text"  name="portNumber" className="p-inputtext" />
                            <ErrorMessage name="portNumber"  component="div" className="p-error" />

                        </div>
                        <div className="p-field">
                            <label>Proje adı:</label>
                            <Field type="text" name="projectName" className="p-inputtext" />
                            <ErrorMessage name="projectName" component="div" className="p-error" />  
                        </div>

                        <div className="p-field">
                        <label>Uygulama Adı:</label>
                        <Field type="text" name="applicationName" className="p-inputtext" />
                        <ErrorMessage name="applicationName" component="div" className="p-error" />
                        </div> 

                        <div className="p-field">
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