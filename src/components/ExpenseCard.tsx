import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Expense } from "../types";

interface ExpenseCardProps {
    expense: Expense;
    onEditClick: (expense: Expense) => void;
    onDeleteClick: (id: string) => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onEditClick, onDeleteClick }) => {
    const { title, date, description, category, amount } = expense;
    return (
        <Card variant="outlined" sx={{ maxWidth: 300, p: 2, borderRadius: 2, borderColor: "primary.main", mr: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6" fontWeight="bold">
                        {title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {new Date(date).toLocaleDateString()}
                    </Typography>
                </Box>
                <Typography variant="body2" textAlign="left" my={2}>
                    {description}
                </Typography>
                <Typography variant="body2" textAlign="left" my={2}>
                    {category}
                </Typography>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" fontWeight="bold">
                        {amount}
                    </Typography>
                    <Box display="flex">
                        <EditIcon color="primary" sx={{mr: 1}} onClick={() => onEditClick(expense)}/>
                        <DeleteIcon color="error" onClick={() => onDeleteClick(expense.id)}/>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ExpenseCard;
