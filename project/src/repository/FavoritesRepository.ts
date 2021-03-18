class FavoritesRepository {
    public readonly storageKey: string = "Favorites";
    private _favorites: Array<string> = [];

    public get favorites() {
        let items: Array<string> = [];
        const storageData = localStorage.getItem(this.storageKey);
        if (storageData)
            items = this.stringToArray(storageData);
        this.favorites = items;
        return this._favorites;
    }

    public set favorites(items: Array<string>) {
        const storageData = this.arrayToString(items);
        localStorage.setItem(this.storageKey, storageData);
        this._favorites = items;
    }

    public add = (value: string): Array<string> => {
        const items = this.favorites;
        items.push(value);
        this.favorites = items;
        return this._favorites;
    };

    public remove = (value: string): Array<string> => {
        let items = this.favorites;
        items = items.filter(item => item !== value);
        this.favorites = items;
        return this._favorites;
    };

    private stringToArray = (value: string): Array<string> => {
        return JSON.parse(value);
    };

    private arrayToString = (value: Array<string>): string => {
        return JSON.stringify(value);
    };
}

export default FavoritesRepository;
