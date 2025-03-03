import { CategoryKey } from "./constants";

export interface Expense {
    id: string
    title: string;
    date: Date;
    description: string;
    category: CategoryKey;
    amount: number;
}