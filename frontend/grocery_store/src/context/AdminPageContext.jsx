import { useState, useEffect, createContext } from "react";

export const AdminPageContext = createContext();

export const AdminPageProvide = ({ children }) => {
    const [config, setConfig] = useState({
        showAddButton: true,
        handleAdd: () => {},
        addButtonLabel: "",
        onSearch: () => {},
        handleClearSearch: () => {},
        onFilterCategory: () => {}
    });

    return (
        <AdminPageContext.Provider value={{ config, setConfig}}>
            {children}
        </AdminPageContext.Provider>
    );
}