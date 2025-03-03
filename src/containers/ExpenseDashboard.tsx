import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import ExpenseCard from '../components/ExpenseCard'
import { CategoryKey, categories } from '../constants'
import { Expense } from '../types';
import ExpenseModal from '../components/ExpenseModal';
import ExpenseService from '../services/ExpenseService';

export const ExpenseDashboard = () => {
    const [category, setCategory] = React.useState<CategoryKey | null>(null);
    const [expenses, setExpenses] = React.useState<Expense[]>([]);
    const [filteredExpenses, setFilteredExpenses] = React.useState<Expense[]>([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [mode, setMode] = React.useState<"create" | "edit">("create");
    const [selectedExpense, setSelectedExpense] = React.useState<Expense | undefined>();


    const fetchExpenses = async () => {
        try {
            const expenses = await ExpenseService.getExpenses();
            setExpenses(expenses);
        } catch (error) {
            console.error(error);
        }
    }

    const handleCreateExpense = async (expense: Omit<Expense, "id">) => {
        try {
            const createdExpense = await ExpenseService.createExpense(expense);
            setExpenses([...expenses, createdExpense]);
            setOpenModal(false);
        } catch (error) {
            console.error(error);
            setOpenModal(false);
        }
    }

    const handleUpdateExpense = async (id: string, expense: Expense) => {
        try {
            await ExpenseService.updateExpense(id, expense);
            setOpenModal(false);
        } catch (error) {
            console.error(error);
            setOpenModal(false);
        }
    }

    const handleDeleteExpense = async (id: string) => {
        try {
            await ExpenseService.deleteExpense(id);
            const updatedExpenses = expenses.filter((expense) => expense.id !== id);
            setExpenses([...updatedExpenses]);
            setOpenModal(false);
        } catch (error) {
            console.error(error);
            setOpenModal(false);
        }
    }


    useEffect(() => {
        fetchExpenses();
    }, []);

    const renderExpenses = (category: CategoryKey | null) => {
        if (category !== null) {
            return filteredExpenses.map((expense) => (
                <ExpenseCard expense={expense} onEditClick={(expense) => {
                    setMode("edit");
                    setOpenModal(true);
                    setSelectedExpense(expense);
                }} onDeleteClick={async (id) => {
                    await handleDeleteExpense(id);
                }} />
            ))
        } else {
            return expenses.map((expense) => (
                <ExpenseCard expense={expense} onEditClick={(e) => {
                    console.log(e);
                    setSelectedExpense(e);
                    setMode("edit");
                    setOpenModal(true);
                }} onDeleteClick={async (id) => {
                    await handleDeleteExpense(id);
                }} />
            ))
        }
    }

    return (
        <Box width={800} mx="auto">
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
                Expense Dashboard
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mt={4}>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        label="Category"
                        onChange={(e) => {
                            setCategory(e.target.value as CategoryKey)
                            const filteredExpenses = expenses.filter((expense) => expense.category === e.target.value);
                            setFilteredExpenses(filteredExpenses);
                        }}
                    >
                        {
                            categories.map((category) => (
                                <MenuItem value={category.key}>{category.value}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={() => {
                    setSelectedExpense(undefined);
                    setMode("create");
                    setOpenModal(true)
                }}>
                    Create Expense
                </Button>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mt={4}>
                {renderExpenses(category)}
            </Box>
            <ExpenseModal mode={mode} open={openModal} onClose={() => setOpenModal(false)} expense={selectedExpense} onSubmit={async (m, expense) => {
                if (m === "create") {
                    await handleCreateExpense(expense);
                } else {
                    await handleUpdateExpense(expense.id, expense);
                    await fetchExpenses();
                }
            }} />
        </Box>
    )
}
