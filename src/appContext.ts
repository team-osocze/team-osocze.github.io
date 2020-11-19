import * as React from "react";
import { Dispatch, SetStateAction} from "react";

interface AppContextProps {
    showInfo: boolean;
    setShowInfo: Dispatch<SetStateAction<boolean>>;
}

const defaultContext: AppContextProps = {
    showInfo: true,
    setShowInfo: (): void => {},
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