//Store the budgets
const plusBudget = [];
const minusBudget = [];

//Add a dynamic date
window.onload = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];;
    const date = new Date();
    document.getElementById('date').innerHTML = months[date.getMonth()] + ' ' + date.getFullYear();
};

document.querySelector('#budgetSubmit').addEventListener('click', function(e){
	e.preventDefault();

	const budgetOption = document.querySelector('#budgetOption').value;
	const budgetAmount = document.querySelector('#budgetAmount').value;
	const budgetDescription = document.querySelector('#budgetDescription').value;

	const insertListItems = ( list ) =>{
		const numberListItem = parseInt(budgetAmount).toLocaleString();
		list.insertAdjacentHTML( 'afterbegin', `<li><span class="list-item-description">${budgetDescription}</span><span class="list-item-amount">${numberListItem}</span><span><button>&times;</button></span></li>` );
		updateFullBudget();
	};

	if(budgetOption === 'plus'){
		const plusList = document.querySelector('.income-show-list-wrap ul');
		plusBudget.push( parseInt(budgetAmount) );
		insertListItems( plusList );
	} else {
		const minusList = document.querySelector('.expense-show-list-wrap ul');
		minusBudget.push( parseInt( -(budgetAmount) ) );
		insertListItems( minusList );
	};
});


document.querySelectorAll('.budget-show-lists').forEach( list => list.addEventListener('click', function(e){
	const list = document.querySelectorAll('.budget-show-lists ul li');
	const listItem = e.target.parentNode.parentNode;
	const listItemAmount = listItem.querySelector('.list-item-amount').textContent;

	const removeAndUpdate = ( budgetArr, matchingAmount ) =>{
		if (matchingAmount > -1) {
		  	budgetArr.splice(matchingAmount, 1);
		  	listItem.remove();
		  	updateFullBudget();
		};
	};
	if (e.target.nodeName === 'BUTTON'){
		if(e.target.parentNode.parentNode.parentNode.parentNode.classList.contains('income-show-list-wrap')){
			removeAndUpdate( plusBudget, plusBudget.indexOf(parseInt(listItemAmount)) );
		} else if(e.target.parentNode.parentNode.parentNode.parentNode.classList.contains('expense-show-list-wrap')){
			removeAndUpdate( minusBudget, minusBudget.indexOf(parseInt( -listItemAmount)) );
		};
	};	
}));

const removeAndUpdate = ( budgetArr, matchingAmount ) =>{
	matchingAmount = budgetArr.indexOf(parseInt(listItemAmount));
	if (plusMatchingAmount > -1) {
	  	budgetArr.splice(matchingAmount, 1);
	  	listItem.remove();
	  	updateFullBudget();
	};
};	

const updateFullBudget = () =>{
	const finalBudgetDisplay = document.querySelector('.budget-total h1');
	const incomeBudgetDisplay = document.querySelector('.budget-income p');
	const expenseBudgetDisplay = document.querySelector('.budget-expense p');

	const fullBudget = [...plusBudget, ...minusBudget];

	const reduceBudgets = ( arr, display ) =>{
		const reducedArray = arr.reduce( (accumulator, num) =>{
			return accumulator + num
		}, 0);

		display.textContent = reducedArray.toLocaleString();
  	};

	reduceBudgets(fullBudget, finalBudgetDisplay);
	reduceBudgets(plusBudget, incomeBudgetDisplay);
	reduceBudgets(minusBudget, expenseBudgetDisplay);

};



