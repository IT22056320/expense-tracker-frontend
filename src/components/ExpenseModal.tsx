import React, { useEffect, useState } from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Expense } from "../types";
import { categories, CategoryKey } from "../constants";

interface ExpenseModalProps {
    mode: "create" | "edit";
    open: boolean;
    expense?: Expense;
    onClose: () => void;
    onSubmit: (mode: "create" | "edit" , expense: Expense) => void;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ mode = "create", expense, open, onClose, onSubmit }) => {

    useEffect(() => {
        setTitle(expense?.title);
        setCategory(expense?.category);
        setDescription(expense?.description);
        setDate(expense ? dayjs(expense.date) : null);
        setAmount(expense?.amount);
    }, [expense]);

    const [title, setTitle] = useState(expense?.title);
    const [category, setCategory] = useState(expense?.category);
    const [description, setDescription] = useState(expense?.description);
    const [date, setDate] = useState<Dayjs | null>(expense ? dayjs(expense.date) : null);
    const [amount, setAmount] = useState(expense?.amount);

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "white",
                    p: 4,
                    borderRadius: 2,
                    width: 600,
                }}
            >
                <Typography variant="h6" fontWeight="bold" mb={2}>
                    {mode === "create" ? "Create Expense" : "Edit Expense"}
                </Typography>
                <Stack direction="row" spacing={2}>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="dense"
                        sx={{ width: "50%" }}
                    />
                    <FormControl sx={{ width: "50%" }}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value as CategoryKey)}
                        >
                            {
                                categories.map((category) => (
                                    <MenuItem value={category.key}>{category.value}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Stack>


                <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="dense"
                    sx={{ mt: 2 }}
                />

                <Box display="flex" gap={2} mt={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            sx={{ width: "50%" }}
                        />
                    </LocalizationProvider>

                    <TextField
                        sx={{ width: "50%" }}
                        label="Amount spent"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value as unknown as number)}
                    />
                </Box>

                <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                    <Button variant="contained" color="error" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => onSubmit(mode, {
                        ...expense,
                        title,
                        category: category!,
                        description,
                        date: date!.toDate(),
                        amount: amount!,
                    } as any)}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ExpenseModal;
