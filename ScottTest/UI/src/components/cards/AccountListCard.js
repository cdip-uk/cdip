import { useState, useEffect } from 'react';
import Card from './Card';
import AccountList from '../AccountList';
import { API_URL } from '../../Consts.js';

export const AccountListCard = () => {
  const [accounts, setAccounts] = useState(null);

  const getAccounts = () => {
    fetch(API_URL + "account/")
      .then((response) => response.json())
      .then((data) => {
        setAccounts(data);
      });
  };

  useEffect(() => {
    getAccounts();

  }, []);

  return (
    <Card stylename="accounts" header="Accounts">
      <div>
        <AccountList accounts={accounts} />
      </div>
    </Card>
  );
};
