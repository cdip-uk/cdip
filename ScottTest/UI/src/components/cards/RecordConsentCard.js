import Card from './Card';
import RecordConsentForm from '../RecordConsentForm';
import { API_URL } from '../../Consts.js';

export const RecordConsentCard = (props) => 
{
  const onRecordConsent = (signerId, userId, consentType) => 
  {
    fetch(API_URL + "consent/",
    {
      method: 'POST',

      body: JSON.stringify(
      {
        userId: userId,
        signerId: signerId,
        consentType: consentType
      }),

      headers: 
      {
        "Content-Type": "application/json"
      }
    })
    .then(response => 
    {
        if (!response.ok) {
          response.json().then(e => {
            console.log("Error: " + e.msg);
          });
        }
        else 
        {
          response.json().then(d => 
          {
            props.onConsentAdded();
          });
        }
      });
  };

  return (
    <Card stylename="recordconsent" header="Record Consent">
      <RecordConsentForm signerId={props.metaMaskAccount} userId="" consentType="" onSubmit={onRecordConsent} />
    </Card>
  );
};
