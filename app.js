//listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e)
{
    //hide results
    document.getElementById('result').style.display='none';
    
    //show loader
    document.getElementById('loading').style.display='block';
    setTimeout(calculateresult,2000);
    e.preventDefault();
});

//calculate result function definition
function calculateresult(e)
{
    
    console.log('Calculating...');
    //UI vars
    const amount=document.getElementById('amount');
    const interest=document.getElementById('interest');
    const years=document.getElementById('years');
    const monthlyPayment=document.getElementById('monthly-payment');
    const totalPayment=document.getElementById('total-payment');
    const totalInterest=document.getElementById('total-interest');

    //numaric value vars
    const principal=parseFloat(amount.value);
    const calculatedInterest=parseFloat(interest.value)/100/12;
    const calculatedPayment=parseFloat(years.value);

    //compute monthly payment
    const x=Math.pow(1+calculatedInterest,calculatedPayment);
    const monthly=(principal*x*calculatedInterest)/(x-1);
    if(isFinite(monthly))
    {
        monthlyPayment.value=monthly.toFixed(2);
        totalPayment.value=(monthly*calculatedPayment).toFixed(2);
        totalInterest.value=((monthly*calculatedPayment)-principal).toFixed(2);
        document.getElementById('loading').style.display='none';
        document.getElementById('result').style.display='block';
    }
    else
    {
        //hiding loder
        document.getElementById('loading').style.display='none';
        
        //hiding results
        document.getElementById('result').style.display='none';
        console.log('Error');
          showError('Please check your numbers');
    }

}

//show error function definition
function showError(error)
{
    //create a div
    const errorDiv=document.createElement('div');
    
    //get elements
    const card=document.querySelector('.card');
    const heading=document.querySelector('.heading');
    
    //Add class
    errorDiv.className='alert alert-danger';
    
    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    
    //Insert error above
    card.insertBefore(errorDiv,heading);
    
    //clear error after 3 seconds
    setTimeout(clearError,3000);
}

function clearError()
{
    document.querySelector('.alert').remove();
}
