export interface ITabProps {
    id: string;
    "aria-controls": string;
}

export const TabProps = (index: number): ITabProps => {
    return {
        id: `simple-tab--${index}`,
        "aria-controls": `simple-tab-panel--${index}`,
    };
};