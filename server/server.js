const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const fruitRouter = require('./routes/fruit.router'); 
const inventoryRouter = require('./routes/inventory.router');
const transactionsRouter = require('./routes/transactions.router');

console.log('Starting periodic price updates');

// Price Updates
const updatePricesPeriodically = require('../src/services/priceUpdater');
updatePricesPeriodically(); 

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/fruits', fruitRouter); 
app.use('/api/inventory', inventoryRouter);
app.use('/api/transactions', transactionsRouter);


// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
