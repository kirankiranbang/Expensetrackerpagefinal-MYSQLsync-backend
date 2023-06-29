const Sequelize=require('sequelize')
const Expense=require('../models/expense');
exports.postExpense = async (req, res) => {
  try {
    const { expenseamount, description, category } = req.body;

    // Create a new expense object
    const newExpense = new Expense({
      expenseamount: expenseamount,
      description: description,
      category: category
    });

    // Save the expense object to the database
    const createdExpense = await newExpense.save();

    // Return the created expense as a response
    res.status(200).json({
      success: true,
      message: 'Expense added successfully',
      data: createdExpense
    });
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating expense'
    });
  }
};


exports.getAllExpensesData = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).send('Error fetching expenses');
  }
};

exports.getExpenseById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const expense = await Expense.findByPk(id);

    if (expense) {
      res.json(expense);
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).send('Error fetching expense');
  }
};


exports.deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  try {
    // Find the expense by ID
    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Delete the expense from the database
    await expense.destroy();

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting expense'
    });
  }
};





//sequalize 
exports.updateExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const { expenseamount, description, category } = req.body;

    // Update the expense in the database
    const [rowsAffected] = await Expense.update(
      {
        expenseamount,
        description,
        category,
      },
      {
        where: { id },
      }
    );

    if (rowsAffected === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense updated successfully' });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};









































// // exports.editExpense = (req, res) => {
// //   const { id } = req.params;
// //   const { expenseamount, description, category } = req.body;

// //   Expense.findByPk(id)
// //     .then((expense) => {
// //       if (expense) {
// //         expense.expenseamount = expenseamount;
// //         expense.description = description;
// //         expense.category = category;
// //         return expense.save();
// //       } else {
// //         throw new Error('Expense not found');
// //       }
// //     })
// //     .then((updatedExpense) => {
// //       res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense });
// //     })
// //     .catch((error) => {
// //       res.status(500).json({ error: 'An error occurred while updating the expense' });
// //     });
// // };

// // exports.deleteExpense = (req, res) => {
// //   const { id } = req.params;

// //   Expense.findByPk(id)
// //     .then((expense) => {
// //       if (expense) {
// //         return expense.destroy();
// //       } else {
// //         throw new Error('Expense not found');
// //       }
// //     })
// //     .then(() => {
// //       res.status(200).json({ message: 'Expense deleted successfully' });
// //     })
// //     .catch((error) => {
// //       res.status(500).json({ error: 'An error occurred while deleting the expense' });
// //     });
// // };

// // exports.getAllExpensesData = (req, res) => {
// //   Expense.findAll()
// //     .then((expenses) => {
// //       res.status(200).json(expenses);
// //     })
// //     .catch((error) => {
// //       res.status(500).json({ error: 'An error occurred while fetching the expenses data' });
// //     });
// // };
















// const Sequelize=require('sequelize')
// const Expense=require('../models/expense');



// exports.getAllExpensesData=async (req,res,next)=>{
//     try {
//         const data=await Expense.findAll();
//         console.log(data);
//         res.status(200).json({allExpenses:data})
        
//     } catch (error) {
//         console.log(JSON.stringify(error));
//         res.status(500).json(error)
//     }
// }

// exports.postExpense = async (req, res, next) => {
//     if (!req.body.expenseamount || !req.body.description || !req.body.category ) {
//       console.log('missing req fields');
//       return res.sendStatus(500);
//     }
  
//     try {
//       const expenseamount = req.body.expenseamount;
//       const description = req.body.description;
//       const category = req.body.category;
  
//       const data = await Expense.create({
//         expenseamount: expenseamount,
//         description: description,
//         category: category
//       });
  
//       console.log('updated success');
  
//       res.status(201).json({ newExpense: data });
//     } catch (error) {
//       console.log(error, JSON.stringify(error));
//       res.status(501).json({ error });
//     }
//   };









// // exports.postExpense = async (req, res, next) => {
// //     if (!req.body.expenseamount || !req.body.description || !req.body.category) {
// //       console.log('Missing required fields');
// //       return res.sendStatus(500);
// //     }
  
// //     try {
// //       const expenseamount = req.body.expenseamount;
// //       const description = req.body.description;
// //       const category = req.body.category;
// //       const userId = req.user.id; // Assuming you have the authenticated user's ID available in req.user.id
  
// //       const data = await Expense.create({
// //         expenseamount: expenseamount,
// //         description: description,
// //         category: category,
// //         user_id: userId // Assign the user ID to the `user_id` field
// //       });
  
// //       console.log('Expense created successfully:', data);
  
// //       res.status(201).json({ newExpense: data });
// //     } catch (error) {
// //       console.error('Error creating expense:', error);
// //       res.status(501).json({ error });
// //     }
// //   };
  

// // exports.postExpense = async (req, res, next) => {
// //     if (!req.body.expenseamount || !req.body.description || !req.body.category || !req.body.user_id) {
// //       console.log('Missing required fields');
// //       return res.sendStatus(500);
// //     }
  
// //     try {
// //       const expenseamount = req.body.expenseamount;
// //       const description = req.body.description;
// //       const category = req.body.category;
// //       const user_id = req.body.user_id;
  
// //       const data = await Expense.create({
// //         expenseamount: expenseamount,
// //         description: description,
// //         category: category,
// //         user_id: user_id
// //       });
  
// //       console.log('Expense created successfully');
  
// //       res.status(201).json({ newExpense: data });
// //     } catch (error) {
// //       console.log(error, JSON.stringify(error));
// //       res.status(501).json({ error });
// //     }
// //   };

















//   exports.deleteExpense = async (req, res, next) => {
//         try {
//           const expenseId = req.params.userid; // Updated parameter name
          
//           const deletedExpense = await Expense.destroy({ where: { id: expenseId } });
          
//           if (deletedExpense === 0) {
//             return res.status(404).json({ error: 'Expense not found' });
//           }
      
//           console.log(`Successfully deleted expense with ID: ${expenseId}`);
//           res.sendStatus(200).json({success:true,mess:'successfully deleted'});
//         } catch (error) {
//           console.log(JSON.stringify(error));
//           res.status(500).json({ error: 'Something went wrong' });
//         }
//       };
      
  




// // exports.deleteExpense = async (req, res, next) => {
// //     try {
// //       const expenseId = req.params.userid; // Updated parameter name
  
// //       const deletedExpense = await Expense.destroy({ where: { id: expenseId } });
  
// //       if (deletedExpense === 0) {
// //         return res.status(404).json({ error: 'Expense not found' });
// //       }
  
// //       console.log(`Successfully deleted expense with ID: ${expenseId}`);
// //       res.status(200).json({ success: true, message: 'Successfully deleted' });
// //     } catch (error) {
// //       console.log(JSON.stringify(error));
// //       res.status(500).json({ error: 'Something went wrong' });
// //     }
// //   };








// exports.getExpenseById = async (req, res, next) => {
//     try {
//       const expenseId = req.params.id; // Access the expense ID from the request parameters
  
//       // Retrieve the expense from the database using the expenseId
//       const expense = await Expense.findByPk(expenseId);
  
//       if (!expense) {
//         return res.status(404).json({ error: 'Expense not found' });
//       }
  
//       res.status(200).json({ expense });
//     } catch (error) {
//       console.log('Error retrieving expense:', error);
//       res.status(500).json({ error: 'Something went wrong' });
//     }
//   };
  


//   exports.updateExpense = async (req, res, next) => {
//     try {
//       const expenseId = req.params.id;
//       const { expenseamount, description, category } = req.body;
  
//       const updatedExpense = await Expense.update(
//         {
//           expenseamount: expenseamount,
//           description: description,
//           category: category
//         },
//         { where: { id: expenseId } }
//       );
  
//       if (updatedExpense[0] === 0) {
//         return res.status(404).json({ error: 'Expense not found' });
//       }
  
//       console.log(`Successfully updated expense with ID: ${expenseId}`);
//       res.sendStatus(200).json({ success: true, mess: 'successfully updated' });
//     } catch (error) {
//       console.log(JSON.stringify(error));
//       res.status(500).json({ error: 'Something went wrong' });
//     }
//   };































// exports.updateExpense = async (req, res) => {
//   const expenseId = req.params.id;
//   const { expenseamount, description, category } = req.body;

//   try {
//     // Find the expense by ID
//     const expense = await Expense.findByPk(expenseId);

//     if (!expense) {
//       return res.status(404).json({ message: 'Expense not found' });
//     }

//     // Update the expense's properties
//     expense.expenseamount = expenseamount;
//     expense.description = description;
//     expense.category = category;

//     // Save the updated expense to the database
//     await expense.save();

//     res.status(200).json({
//       success: true,
//       message: 'Expense updated successfully',
//       data: expense
//     });
//   } catch (error) {
//     console.error('Error updating expense:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error updating expense'
//     });
//   }
// };





// Expense controller method for updating an expense
//mongo db

// exports.updateExpense = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { expenseamount, description, category } = req.body;

//     // Find the expense by ID in the database
//     const expense = await Expense.findById(id);
//     if (!expense) {
//       return res.status(404).json({ error: 'Expense not found' });
//     }

//     // Update the expense with the new data
//     expense.expenseamount = expenseamount;
//     expense.description = description;
//     expense.category = category;

//     // Save the updated expense in the database
//     const updatedExpense = await expense.save();

//     res.status(200).json(updatedExpense);
//   } catch (error) {
//     console.error('Error updating expense:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };






