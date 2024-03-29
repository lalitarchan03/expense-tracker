
// function generateUniqueId() {
//     return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
//   }

const aInput = document.getElementById('amount');
const dInput = document.getElementById('disc');
const cInput = document.getElementById('categ');
const msg = document.getElementById('msg');
const btn = document.querySelector('.btn');
const uuid = ('uuid');
const submitButton = document.getElementById('submit');
const id = document.getElementById('id');


const form = document.getElementById('my-form');
form.addEventListener('submit', addItem);

// function to run on submitting the form
function addItem(e) {

    e.preventDefault();

    const amount = e.target.amount.value;
    const description = e.target.disc.value;
    const category = e.target.categ.value;

    const expenseDetails = {
        amount,
        description,
        category,
    };

    // console.log('frontend' ,expenseDetails);

    // if in UPDATE mode
    if (submitButton.value === 'Update') {
        console.log('frontend', id.value);
        axios.put(`http://localhost:3000/expense/update-expense/${id.value}`, expenseDetails)
        .then(res => {
            form.reset();
            showDetailsOnScreen(res.data.newExpenseDetail);
            submitButton.value ='Add Expense';
        })
        .catch(err => {
            console.log(err);
        });
    }

    // adding data to database
    else {
    axios.post("http://localhost:3000/expense/add-expense", expenseDetails)
        .then(res => {
            form.reset();
            showDetailsOnScreen(res.data.newExpenseDetail)

        })
        .catch(err => {
            console.log(err)
        })
    }
};

// showing data on screen 
function showDetailsOnScreen(newExpenseDetail) {
    
    // console.log("RESPONSE" ,newExpenseDetail);
    const parentList = document.getElementById('items');
    const newListItem = document.createElement('li');
    newListItem.appendChild(document.createTextNode('ID: ' + newExpenseDetail.id + ', ' + 'Amount: ' + newExpenseDetail.amount + ', ' + 'Description: ' + newExpenseDetail.description + ', ' + 'Category: ' + newExpenseDetail.category ))
    parentList.appendChild(newListItem);

    // delete button 
    const delbtn = document.createElement('button');
    delbtn.className = 'delete';
    delbtn.innerText = 'X'

    delbtn.onclick = () => {

        let expenseid = newExpenseDetail.id;
        axios.delete(`http://localhost:3000/expense/remove-expense/${expenseid}`)
        .then(res => {
            // console.log("NODETODELETE", newListItem);
            parentList.removeChild(newListItem);
            // console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
        
    };

    // edit button 
    const editbtn = document.createElement('button');
    editbtn.innerText = 'Edit';
    editbtn.className = 'edit';
    editbtn.onclick = () => {
        
            aInput.value = newExpenseDetail.amount;
            dInput.value = newExpenseDetail.description;
            cInput.value = newExpenseDetail.category;

            submitButton.value = "Update";
            id.value = newExpenseDetail.id;
            console.log('EDIT 1', id.value);
            // uniqueId = uniqueId;
            parentList.removeChild(newListItem);
        
    };

    newListItem.appendChild(delbtn);
    newListItem.appendChild(editbtn);
    
};


const getAllExpenses = (req, res, next) => {
    axios.get("http://localhost:3000/expense/get-expense")
        .then((res) => {
            for (let i=0; i < res.data.allExpenseDetail.length; i++) {
                // console.log('GET', res.data.allUserDetail[i]);
                showDetailsOnScreen(res.data.allExpenseDetail[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        })
};
getAllExpenses();
