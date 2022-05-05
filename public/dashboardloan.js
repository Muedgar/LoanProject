
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


  ////// creating loan

  document.getElementById("loancalc").addEventListener('submit',async e=> {
      e.preventDefault();
      let amount = document.getElementById("loanamount").value;
      let term = document.getElementById("loanterm").value;
      if(!amount || !term) {
        alert("please enter all values");
        return;
         }
    if(amount<0 || term<0) {
        alert("please enter positive values only");
        return;
    }
      try {
        await axios.post('/api/createLoan',{amount,term}).then(d=> {
            document.getElementById("viewloaninfo").click();
            populateAnswers();
            document.getElementById("loanamount").value = "";
            document.getElementById("loanterm").value = "";
          }).catch(e=>new Error(e));
      } catch (error) {
          throw new Error(error);
      }
      
  });

  populateAnswers();

  async function populateAnswers() {
    let loansContainer = document.getElementById("answers");
    try {
        await axios.get('/api/readLoan').then(d=> {
            loansContainer.innerHTML = " ";
            // for each add it to answers
            
            

            const {data} = d;
            
            for(let loan of data) {
                let loanDiv = document.createElement('div');
            loanDiv.style.width = "250px";
            loanDiv.style.height = "200px";
            loanDiv.style.display = "flex";
            loanDiv.style.flexDirection = "column";
            loanDiv.style.overflow = "scroll";
            loanDiv.style.margin = "5px";
            loanDiv.style.border = "3px solid black";
            let h1 = document.createElement('h1');
            h1.style.fontSize = "1em";
            loanDiv.appendChild(h1);
                const {_id,amount,term,monthCount} = loan;
                let monthlyInterestPaid = 0;
                let totalAmountRemaining = 0;

                /// first build the array of payments
                let arrayOfPayments = buildArrayOfLoans(amount,term);
                monthlyInterestPaid = findCurrentMonthHistory(arrayOfPayments, monthCount);
                totalAmountRemaining = findBalance(arrayOfPayments,monthCount);
                if(!monthlyInterestPaid) {
                    monthlyInterestPaid = 0;
                }
                let output = `Monthly Interest Paid (For this month): ${parseFloat(monthlyInterestPaid).toFixed(2)} INR<br>`+`Total Amount Remaining To Be Paid: ${parseFloat(totalAmountRemaining).toFixed(2)} INR<br><br><br>
                            `;

                // after calculating the most recent output string then add to answers div
                h1.innerHTML += output;
                let form = document.createElement('form');
                
                let btn = document.createElement('input');
                btn.setAttribute('type','submit');
                btn.setAttribute('value','Pay Loan Due');
                btn.setAttribute('class','btn btn-info');

                form.appendChild(btn);
                loanDiv.appendChild(form);
                form.addEventListener("submit",e=> {
                    e.preventDefault();
                    updateLoan(_id);
            });
            loansContainer.appendChild(loanDiv);
            };
        }).catch(e=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
  }

  async function updateLoan(id) {
    await axios.put('/api/updateLoan',{id}).then(d=> {
        populateAnswers();
    }).catch(e=>new Error(e));
  }

function findBalance(arrayOfPayments, monthCount) {
    for(let obj of arrayOfPayments) {
      if(obj.month == monthCount) {
          return obj.principal;
      }
    }
}
  function findCurrentMonthHistory(arrayOfPayments, monthCount) {
      for(let obj of arrayOfPayments) {
        if(obj.month == monthCount) {
            return obj.interest;
        }
      }
  }
  function buildArrayOfLoans(loanAmount,loanTerm) {
    let totalNumberOfPayments = loanTerm * 12;
    let monthlyRate = 0.8/100;
    let payment = (loanAmount)*(
        (monthlyRate*(Math.pow((1+monthlyRate),totalNumberOfPayments))
        )/
        (
            (Math.pow((1+monthlyRate),totalNumberOfPayments))-1));
let output = [];
            for (let count = 0; count < totalNumberOfPayments+1; ++count)
            { 
                let obj = {};
                //initialise table interest // next time it will change because it is dynamic
                let interest = 0;
                
                //initialise table monthlyPrincipal // next time it will change because it is dynamic
                let monthlyPrincipal = 0;
                obj.month = count + 1;
                
                obj.principal = parseFloat(loanAmount).toFixed(2);
                //interest payment for this row
                interest = loanAmount * monthlyRate;
                obj.interest = parseFloat(interest).toFixed(2);
                //principal payment for this row
                monthlyPrincipal = payment - interest;
                obj.monthlyPrincipal = parseFloat(monthlyPrincipal).toFixed(2);
                output.push(obj);
                loanAmount = loanAmount - monthlyPrincipal;		
            }
            return output;
  }