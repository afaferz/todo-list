export interface ITask {
    id: number | null;
    name: string;
    status: boolean;
    type?: string;
    priority: number;
    description?: string;
    // eslint-disable-next-line camelcase
    created_at: Date | string;
}
