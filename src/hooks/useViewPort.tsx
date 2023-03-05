import React, { createContext, useReducer, useContext, useState, ReactNode } from "react";
import { VIEW_PORT } from "../constants/enums";

interface Props {
    children?: ReactNode
}

interface ViewPortContext {
    viewMode: string
    setViewMode: React.Dispatch<React.SetStateAction<string>>
}

const initialState = {
    viewMode: VIEW_PORT.GRID,
    setViewMode: () => null
}


export const ViewModeContext = createContext<ViewPortContext>(initialState);


const ViewModeProvider = ({ children }: Props) => {
    const [viewMode, setViewMode] = useState<string>(VIEW_PORT.GRID)

    return (
        <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
            {children}
        </ViewModeContext.Provider>
    );
};

export default ViewModeProvider;

export const useViewModeContext = () => useContext(ViewModeContext);

