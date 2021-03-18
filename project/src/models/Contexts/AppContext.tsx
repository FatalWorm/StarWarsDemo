import React, {createContext, Fragment, HTMLAttributes, useContext, useMemo, useState} from "react";
import {AppProvider} from "./AppProvider";
import {CharList} from "./CharList";
import {CharSelectedList} from "./CharSelectedList";

export const AppContext = createContext(new AppProvider());
export const useAppContext = (): AppProvider => useContext(AppContext);

export const AppContextProvider = (props: HTMLAttributes<HTMLDivElement>): JSX.Element => {
    const {children} = props;
    const [list, setList] = useState([]);
    const [selectList, setSelectList] = useState([]);

    const callback = (): AppProvider => new AppProvider(
        new CharList([list, setList]),
        new CharSelectedList([selectList, setSelectList])
    );
    const value = useMemo(callback, [list, setList, selectList, setSelectList]);

    return (
        <Fragment>
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
        </Fragment>
    );
};
