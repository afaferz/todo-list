export interface ITask {
    id: number;
    name: string;
    status: boolean;
    type?: string;
    priority: number;
    description?: string;
    // eslint-disable-next-line camelcase
    created_at: Date | string;
}
