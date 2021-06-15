import { useState, useEffect } from 'react';
import './css/RecordConsentForm.css';

const RecordConsentForm = (props) =>
{
  const [signerId, setSignerId]       = useState('')
  const [userId, setUserId]           = useState('')
  const [consentType, setConsentType] = useState('')

  const handleSubmit = (event) =>
  {
    event.preventDefault();       
    props.onSubmit( signerId, userId, consentType );
  }

  useEffect( () => 
  {
      setSignerId(props.signerId)
      setUserId('')
      setConsentType('');
  }, 
  [props.signerId] );

  return (
    <div className="recordConsentForm">   
        <form onSubmit={handleSubmit}>        
        <label htmlFor="signer">Signer:</label>
        <input type="text" id="signer" name="signer" value={signerId} onChange={e => setSignerId(e.target.value) }/>

        <label htmlFor="userid">User Identity:</label>
        <input type="text" id="userid" name="userid"  value={userId} onChange={e => setUserId(e.target.value)}/>

        <label htmlFor="consenttype">Consent Type:</label>
        <input type="text" id="consenttype" name="consenttype" value={consentType} onChange={e => setConsentType (e.target.value)}/>

        <input type="submit" />
        </form> 
    </div>
  )
}

export default RecordConsentForm;