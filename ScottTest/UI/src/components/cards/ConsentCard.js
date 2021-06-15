import { useState, useEffect } from 'react';
import Card from './Card';
import { API_URL } from '../../Consts.js';

/**********************************************************************************/
export const ConsentCard = (props) => {
  const [latestConsent, setLatestConsent] = useState([]);

  const getLatestConsent = (id) => {
    fetch(API_URL + "consent/" + id)
      .then((response) => response.json())
      .then((data) => {
        setLatestConsent(data);
      });
  };

  useEffect(() => {
    getLatestConsent(props.id);
  }, [props.id]);

  return (
    <Card stylename="consents" header="Consents">
      <p>Latest Consent</p>
      <table>
        <tbody>
          <tr><td>Identity:</td><td>{latestConsent[0]}</td></tr>
          <tr><td>Signer:</td><td>{latestConsent[1]}</td></tr>
          <tr><td>Consent Type:</td><td>{latestConsent[2]}</td></tr>
          <tr><td>Time:</td><td>{new Date(Number(latestConsent[3]) * 1000).toString()}</td></tr>
        </tbody>
      </table>
    </Card>
  );
};
