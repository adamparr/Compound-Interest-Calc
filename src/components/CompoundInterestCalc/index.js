import React, { useState } from 'react'


export default function CompoundInterestCalc() {
  
    const [initialBalance, setInitialBalance] = useState(0);
    const [interestRate, setInterestRate] = useState(5);
    const [years, setYears] = useState(10);
    const [result, setResult] = useState(Object);
    const [deposits, setDeposits] = useState(0);
    const [effectiveAPY, setEffectiveAPY] = useState(0);
    const [depositInterval, setDepositInterval] = useState(12); 

  function handleSubmit(event) {
    event.preventDefault();

    const principal = initialBalance;
    const time = years;
    const rate = interestRate / 100;
    const n = 12;

    const compoundBalanceStepped = (p, t, r, n) => {
      const APY = (1 + r/ n )**n;

      let amount = p;
      let history = [
        {
          amount,
          interest: 0
        }
      ];

      for (let i = 0; i < t; i++) {
        const newAmount = amount * APY;
        const interest = newAmount - amount;
        amount = newAmount;
        history.push({
          amount,
          interest
        }) 
      } 

      const effectiveAPY = (APY - 1) * 100;

      return([history, effectiveAPY]);
    };

    const compoundDeposits =  (p, t, r, n) => {
      const amount = p * (Math.pow((1 + (r / n)), (n * t)));
      const interest = amount - p;

      return {
        amount,
        interest
      };
    };

    if (deposits > 0) {
      const dataDeposits = compoundDeposits(deposits * depositInterval, time, rate, n);
      console.log(dataDeposits);
    }

    const [history, effectiveAPY] = compoundBalanceStepped(principal, time, rate, n);
    const interest = history.reduce((total, object) => {
      return total + object.interest;
    }, 0);

    setResult({
      amount: history.at(-1).amount,
      interest,
      history
    });
    setEffectiveAPY(effectiveAPY);
  }


  function displayResult() {
    if (!result.history) return; 

    return <>
    <span>Future Amount: £{result.history.at(-1).amount.toFixed(2)}</span>
    <span>Interest Accrued:  £{result.interest.toFixed(2)}</span>
    <span>APY: {effectiveAPY.toFixed(2)}%</span>
    </>
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="initial_balance">Initial balance</label>
        <input
          type="number"
          name="initial_balance"
          id="initial_balance"
          placeholder="0"
          value={initialBalance}
          onChange={e => setInitialBalance(e.target.value)}
        />

        <label htmlFor="interest_rate">Interest rate</label>
        <input
          type="number"
          name="interest_rate"
          id="interest_rate"
          value={interestRate}
          onChange={e => setInterestRate(e.target.value)}
        />

        <label htmlFor="years">Years</label>
        <input
          type="number"
          name="years"
          id="years"
          placeholder="0"
          value={years}
          onChange={e => setYears(e.target.value)}
        />

        <label htmlFor="deposit">Regular Deposit</label>
        <input
          type="deposit"
          name="deposit"
          id="years"
          placeholder="0"
          value={deposits}
          onChange={e => setDeposits(e.target.value)}
        />


        <input type="submit" value="Calculate" />
      </form>

      {displayResult()}


    </>
  )
}
