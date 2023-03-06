import React, { createContext, useReducer, useContext, useState, ReactNode } from "react";
import { MENU_MOVIE, VIEW_PORT } from "../constants/enums";

interface Props {
    children?: ReactNode
}

interface ViewPortContext {
    viewMode: string
    setViewMode: React.Dispatch<React.SetStateAction<string>>
    menuMovie: string
    setMenuMovie: React.Dispatch<React.SetStateAction<string>>
}

const initialState = {
    viewMode: VIEW_PORT.GRID,
    setViewMode: () => null,
    menuMovie: MENU_MOVIE.PLAYING_NOW,
    setMenuMovie: () => null
}


export const ViewModeContext = createContext<ViewPortContext>(initialState);


const ViewModeProvider = ({ children }: Props) => {
    const [viewMode, setViewMode] = useState<string>(VIEW_PORT.GRID)
    const [menuMovie, setMenuMovie] = useState<string>(MENU_MOVIE.PLAYING_NOW)

    return (
        <ViewModeContext.Provider value={{ viewMode, setViewMode, menuMovie, setMenuMovie }}>
            {children}
        </ViewModeContext.Provider>
    );
};

export default ViewModeProvider;

export const useViewModeContext = () => useContext(ViewModeContext);

