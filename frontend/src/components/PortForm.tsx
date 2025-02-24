import React, { useState } from "react";

const PortForm: React.FC = () => {
    const [ portNumber, setPortNumber ] = useState("");
    const [ projectName, setProjectName ] = useState("");
    const [ applicationName, setApplicationName ] = useState("");
    const [description, setDescription ] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("From Data: ", { portNumber, projectName, applicationName, description });

    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Port Numarası:</label>
                <input
                type="text"
                value={portNumber}
                onChange={(e) => setPortNumber(e.target.value)}
                required
                />
            </div>

            <div>
                <label>Proje Adı:</label>
                <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
                />
            </div>

            <div>
                <label>Uygulama Adı:</label>
                <input 
                type="text"
                value={applicationName}
                onChange={(e) => setApplicationName(e.target.value)}
                required
                />
            </div>

            <div>
                <label> Açıklama :</label>
                <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            
            <button type="submit">Ekle</button>
        </form>
    );
};

export default PortForm;