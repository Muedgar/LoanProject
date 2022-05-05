
document.getElementById("userdata").addEventListener('submit',e=> {
    e.preventDefault();
})
document.getElementById("loancalc").addEventListener('submit',e=> {
    e.preventDefault();

    let loanAmount = document.getElementById("loanamount").value;
    let loanTerm = document.getElementById("loanterm").value;
    let monthlyRate = 0.8/100;
    let totalNumberOfPayments = loanTerm * 12;
    if(!loanAmount || !loanTerm) {
        alert("please enter all values");
        return;
    }
    if(loanAmount<0 || loanTerm<0) {
        alert("please enter positive values only");
        return;
    }
    
    let periodicAmountPayment = (loanAmount)*(
                                                (monthlyRate*(Math.pow((1+monthlyRate),totalNumberOfPayments))
                                                )/
                                                (
                                                    (Math.pow((1+monthlyRate),totalNumberOfPayments))-1));
    
    
    
    let paymentEveryMonthPrinciple = periodicAmountPayment - (periodicAmountPayment*0.08);
    let paymentEveryMonthInterest = periodicAmountPayment*0.08;
    let finalAmountToBePaid = totalNumberOfPayments * periodicAmountPayment;
    let totalInterest = finalAmountToBePaid - loanAmount;

    let output = `Payment Every Month: ${parseFloat(periodicAmountPayment).toFixed(2)} INR<br>` +`Total of ${(totalNumberOfPayments)} Payments: ${parseFloat(finalAmountToBePaid).toFixed(2)} INR<br>`+`Total Interest: ${parseFloat(totalInterest).toFixed(2)} INR<br><br><br>`;


    buildTable(output,loanAmount,monthlyRate,totalNumberOfPayments,periodicAmountPayment)
    
});

function buildTable(output,loanAmount,monthlyRate,totalNumberOfPayments,payment) {
    let amortizationTable = "<table border='1'><tr><th style='border: 1px solid black'>Month #</th><th style='border: 1px solid black'>Balance</th>" + "<th style='border: 1px solid black'>Interest</th><th style='border: 1px solid black'>Principal</th>";
    
    // build the amortizationTable string which hold the table
	for (let count = 0; count < totalNumberOfPayments+1; ++count)
	{ 
		//initialise table interest // next time it will change because it is dynamic
		let interest = 0;
		
		//initialise table monthlyPrincipal // next time it will change because it is dynamic
		let monthlyPrincipal = 0;
		
		//add a row to the amortization table on each iteration
		amortizationTable += "<tr style='border: 1px solid black' align=center>";
		
		//add the first cell to the row which is month count
		amortizationTable += "<td style='border: 1px solid black'>" + (count + 1) + "</td>";
		
		//main principal amount that is a global variable
		amortizationTable += "<td style='border: 1px solid black; overflow-x:scroll'> (INR) " + parseFloat(loanAmount).toFixed(2) + "</td>";
		
		//interest payment for this row
		interest = loanAmount * monthlyRate;
		amortizationTable += "<td style='border: 1px solid black; overflow-x:scroll'> (INR) " + parseFloat(interest).toFixed(2) + "</td>";
		
		//principal payment for this row
		monthlyPrincipal = payment - interest;
		amortizationTable += "<td style='border: 1px solid black; overflow-x:scroll'> (INR) " + parseFloat(monthlyPrincipal).toFixed(2) + "</td>";
		
		//end the table row on each iteration of the loop	
		amortizationTable += "</tr>";
		
		//update the balance for each loop iteration
		loanAmount = loanAmount - monthlyPrincipal;		
	}
	
	//Final piece added to return string before returning it - closes the table
    amortizationTable += "</table>";
	
	//returns the concatenated string to the page output
    document.getElementById("answers").innerHTML = output;
    document.getElementById("answers").innerHTML += amortizationTable;

    // navigate to the 
    document.getElementById("viewloaninfo").click();
}

getGeoLocation();
getIp();

async function getIp() {
    await axios.get('https://ipapi.co/json/')
  .then(function(response) {
      const {ip} =response.data;
      document.getElementById("ipLabel").innerHTML = ip;
    console.log(ip);
  }).catch(e=>new Error(e));
}

function getGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        document.getElementById("locationLabel").innerHTML = "Geolocation is not supported by this browser.";
      }
}

function showPosition(position) {
    document.getElementById("locationLabel").innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
  }