const Expense = require('../models/expense');
const sequelize = require('../util/database');

exports.postAddExpense = async (req, res , next) => {

    // console.log('backend' , req.body);

    if (!req.body.amount || !req.body.description) {
        throw new Error('Amount and Description is not mentioned');
    };

    try{
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category

        const data = await Expense.create({amount: amount, category: category, description: description});

        res.status(201).json({newExpenseDetail: data});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
};


exports.getAllExpense = (req, res, next) => {
    Expense.findAll()
        .then(data => {
            res.status(200).json({allExpenseDetail: data});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};


exports.deleteExpense = async (req, res, next) => {
    try{
        if ( req.params.id === 'undefined') {
            console.log('id is missing');
            return res.status(400).json({error: 'id is missing'});
        }
        
        let expenseId = req.params.id;

        await Expense.destroy({
            where: {
                id: expenseId
            },
        });
        console.log(`Expense with id ${expenseId} is DELETED`);
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
    
};

exports.updateExpense = async (req, res, next) => {

    // console.log('backend' , req.body);

    if (!req.body.amount || !req.body.description) {
        throw new Error('Amount and Description is not mentioned');
    };

    const { amount, description, category } = req.body;
    const id = req.params.id;

    try {
        const updatedExpense = await sequelize.transaction(async (t) => {
            const expense = await Expense.findOne({
                where: { id: id },
                transaction: t,
            });

            if (!expense) {
                throw new Error('Expense not found');
            }

            const updatedExpense = await expense.update({ amount, category, description }, { transaction: t });

            // Transaction is automatically committed if no errors occurred
            return updatedExpense;
        });

        console.log('Updated Expense:', updatedExpense.get());
        res.status(201).json({ newExpenseDetail: updatedExpense });
    } 
    catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ error: error.message });
    }

};