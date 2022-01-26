export interface ITask {
    id: number | null;
    name: string;
    status: string;
    type?: string;
    priority: number;
    description?: string;
    createdAt: Date | string;
}
