
type ParamsType = {
    [key: string]: string | number | boolean;
}

type ActionResponse<Entity> = {
    page: number,
    results: Array<Entity>,
};

export default class Action<Entity> {
    readonly path: string;
    readonly authHeaders: {
        accept: 'application/json',
        Authorization: string,
    };
    constructor(path: string) {
        this.path = path;

        this.authHeaders = {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        }
    }

    makeParams(params: ParamsType): string {
        return Object.keys(params).reduce((acc, key) => {
            return `${acc}&${key}=${params[key]}`;
        }, '');
    }

    async getList(params: ParamsType = {}): Promise<ActionResponse<Entity>> {
        const paramsString = this.makeParams(params);
        const url = `${process.env.API_URL}${this.path}?${paramsString}`

        const options = {
            method: 'GET',
            headers: this.authHeaders,
        };

        return fetch(url, options).then((res) => res.json());
    }
}