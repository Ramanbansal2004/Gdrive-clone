import { createContext, useContext, useState } from "react";
const FolderContext = createContext();
export const useFolder = () => useContext(FolderContext);

export const FolderProvider = ({ children }) => {
    const [folders, setFolders] = useState([]);
    const [images, setImages] = useState([]);
    return (
        <FolderContext.Provider value={{ folders, setFolders, images, setImages }}>
        {children}
        </FolderContext.Provider>
    )
}