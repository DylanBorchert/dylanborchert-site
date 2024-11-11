'use client';
import React, { createContext, useContext, useState } from 'react';

const ContactContext = createContext({
    isSheetOpen: false,
    openSheet: () => { },
    closeSheet: () => { }
});

interface ContactProviderProps {
    children: React.ReactNode;
}

export const ContactProvider: React.FC<ContactProviderProps> = ({ children }): React.ReactElement => {
    const [isSheetOpen, setSheetOpen] = useState(false);

    const openSheet = () => setSheetOpen(true);
    const closeSheet = () => setSheetOpen(false);

    return (
        <ContactContext.Provider value={{ isSheetOpen, openSheet, closeSheet }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContactSheet = () => useContext(ContactContext);
