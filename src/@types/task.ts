export interface ITask {
    id: number | null;
    name: string;
    status: boolean;
    type?: string;
    priority: number;
    description?: string;
}
