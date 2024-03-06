import React, { createContext, useContext, useState } from 'react';

const UsedIndicesContext = createContext();

export const useUsedIndices = () => useContext(UsedIndicesContext);

export const UsedIndicesProvider = ({ children }) => {
    const [usedIndices, setUsedIndices] = useState([]);

    const addUsedIndex = (index) => {
        if (!usedIndices.includes(index)) {
            setUsedIndices((prevIndices) => [...prevIndices, index]);
        }
    };

    return (
        <UsedIndicesContext.Provider value={{ usedIndices, addUsedIndex }}>
            {children}
        </UsedIndicesContext.Provider>
    );
};