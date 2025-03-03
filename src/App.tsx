import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import ExpenseCard from './components/ExpenseCard';
import ExpenseModal from './components/ExpenseModal';
import { ExpenseDashboard } from './containers/ExpenseDashboard';

function App() {
  return (
    <div className="App">
      <ExpenseDashboard />
    </div>
  );
}

export default App;
