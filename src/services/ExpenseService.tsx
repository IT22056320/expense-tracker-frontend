import { Expense } from "../types";

const API_URL = 'http://localhost:5000/api';

class ExpenseService {
    async getExpenses() {
        const response = await fetch(`${API_URL}/expenses`);
        return response.json();
    }

    async createExpense(expense: Omit<Expense, "id">) {
        const response = await fetch(`${API_URL}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
        });
        return response.json();
    }

    async updateExpense(id: string, expense: Expense) {
        const response = await fetch(`${API_URL}/expenses/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
        });
        return response.json();
    }

    async deleteExpense(id: string) {
        const response = await fetch(`${API_URL}/expenses/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    }
}

export default new ExpenseService();