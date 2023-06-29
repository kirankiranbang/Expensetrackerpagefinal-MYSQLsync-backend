const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');



//post('http://localhost:4000/expense/addexpense',
router.post('/addexpense', expenseController.postExpense);


// http://localhost:4000/expense/editexpense/${id}`
 router.put('/editexpense/:id', expenseController.updateExpense);

//http://localhost:4000/expense/deleteexpense/${id}
router.delete('/deleteexpense/:id', expenseController.deleteExpense);

//http://localhost:4000/expense/addexpense-data');
router.get('/addexpense-data', expenseController.getAllExpensesData);


//http://localhost:4000/expense/addexpense-data/${id}


//http://localhost:4000/expense/addexpense-data/3

router.get('/addexpense-data/:id', expenseController.getExpenseById);
module.exports = router;
