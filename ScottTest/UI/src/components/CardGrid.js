import { useState } from 'react';

import { API_URL } from '../Consts.js';

import { AccountListCard } from './cards/AccountListCard';
import { ConsentCard } from './cards/ConsentCard';
import { MetaMaskCard } from './cards/MetaMaskCard';
import { NumConsentsCard } from './cards/NumConsentsCard';
import { RecordConsentCard } from './cards/RecordConsentCard';

export const CardGrid = (props) => {
  const [metaMaskAccount, setMetaMaskAccount] = useState('');
  const [numConsents, setNumConsents] = useState(0);

  const getNumConsents = () => 
  {
    fetch(API_URL + "consent/total")
      .then((response) => response.json())
      .then((data) => 
      {
        setNumConsents(data);
      });
  };

  return (
    <div className='cardGrid'>

      <AccountListCard />

      <NumConsentsCard numConsents={numConsents} setNumConsents={setNumConsents} getNumConsents={getNumConsents}/>

      <ConsentCard id={numConsents}/>

      <MetaMaskCard setMetaMaskAccount={setMetaMaskAccount} metaMaskAccount={metaMaskAccount} />

      <RecordConsentCard metaMaskAccount={metaMaskAccount} onConsentAdded={getNumConsents}/>
    </div>
  );
};
