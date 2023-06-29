
const express = require('express');
const bodyParser = require('body-parser');

// const bcrypt = require('bcrypt');
// const userRoutes = require('./routes/UserRoutes');
// const loginRoutes = require('./routes/LoginRoutes');
// const welcomeRoutes = require('./routes/WelcomeRoutes');
const ExpenseRoutes = require('./routes/expenseroutes');

const app = express();
const sequelize = require('./util/database');
//  const Logins = require('./models/logins');
// const signups = require('./models/signups');
// const Expenses = require('./models/expense');

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());



// Routes
app.use('/expense', express.static('public'));



// http://localhost:4000/admin/signup
//hoisting through this path
//  app.use('/admin/signup', express.static('public/signup.html'));
// app.use('/admin', userRoutes);

// app.use('/admin/login', express.static('public/login.html'));
// app.use('/admin', loginRoutes);

//http://localhost:4000/expense/addexpense-data');
// app.use('/expense/addexpense', express.static('public/welcome.html'));
// app.use('/expense', welcomeRoutes);



// app.use('/admin/welcome', express.static('public/welcome.html'));
// app.use('/admin', welcomeRoutes);





//http://localhost:4000/expense/addexpense');
app.use('/expense/addexpense', express.static('public/expense.html'));
app.use('/expense', ExpenseRoutes);




//sequelize.sync({ force: true })
//dont use force:true other wise refreshing data in backend erased when u starrt ur server for second time
sequelize.sync()
  .then(() => {
    console.log('MySQL database synced');
    const port = 4000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing MySQL database:', error);
  });







