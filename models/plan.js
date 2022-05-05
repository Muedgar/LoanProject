/*
CREATE
create loans: data required is loan amount, payment terms in years and interest in this case it is known to be 10% annually so there is no need to record interest rate
UPDATE
users can update loan: simply increment the month count
    by making payments to month payment due,
            what the user is really updating is the current month payment due, since prices are fixed, default month is 0, because no payment has been made.
there will be no delete funality necessary

READ
return a list of all loans created.
*/