const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense');

router.post('/add-expense', expenseController.postAddExpense);

router.get('/get-expense', expenseController.getAllExpense);

router.delete('/remove-expense/:id', expenseController.deleteExpense);

router.put('/update-expense/:id', expenseController.updateExpense);

module.exports = router;