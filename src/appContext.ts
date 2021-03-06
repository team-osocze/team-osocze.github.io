import * as React from "react";
import { Dispatch, SetStateAction} from "react";

export interface ScrollInfo {
    appliedPosition: number;
    persistedPosition: number;
}

export interface AppContextProps {
    showInfo: boolean;
    setShowInfo: Dispatch<SetStateAction<boolean>>;
    scroll: ScrollInfo;
    setScroll: Dispatch<SetStateAction<ScrollInfo>>;
}

const defaultContext: AppContextProps = {
    showInfo: true,
    setShowInfo: () => {},
    scroll: { appliedPosition: 0, persistedPosition: 0 },
    setScroll: () => {},
};

const AppContext = React.createContext<AppContextProps>(defaultContext);

function useAppContext() {
    const context = React.useContext(AppContext);

    if(!context) {
        throw new Error(
            "Cannot use `useAppContext` outside of a AppContext"
        );
    }

    return context;
}

const AppContextProvider = AppContext.Provider;

export { AppContextProvider, useAppContext };