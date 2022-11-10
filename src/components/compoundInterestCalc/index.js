import React, { useState } from 'react'

export default function CompoundInterestCalc() {

  const [balance, SetBalance] = useState(0);

  return (
    <form>
      <input type="number" placeholder="0" name="initial_balance"/>
      <input type="number" value="7"  name="interest_rate"/>
      <input type="number" placeholder="0" name="years"/>
      <input type="submit" value="Calculate"/>

      <p>{balance}</p>
      <button onClick={() => SetBalance(balance +1)}>+ 1</button>
    </form>
  )
}
