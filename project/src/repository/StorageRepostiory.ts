export interface IStorageRepository {
    value: string;
}

export class StorageRepository implements IStorageRepository {
    value: string;
    private pageKey = "PageKey";
    private defaultPageValue = 1;
    private defaultTabValue = 0;
    private tabKey = "TabKey";

    public getPage = (): number => {
        const value = parseInt(localStorage.getItem(this.pageKey));
        if (value)
            return value;
        else {
            this.setPage(this.defaultPageValue);
            return this.defaultPageValue;
        }
    };
    public setPage = (value: number): void => {
        localStorage.setItem(this.pageKey, JSON.stringify(value));
    };
    public getTab = (): number => {
        const value = parseInt(localStorage.getItem(this.tabKey));
        if (value)
            return value;
        else {
            this.setTab(this.defaultTabValue);
            return this.defaultTabValue;
        }
    };
    public setTab = (value: number): void => {
        localStorage.setItem(this.tabKey, JSON.stringify(value));
    };
}
