import { useState, useEffect } from 'react';
import './css/RecordConsentForm.css';

import { API_URL } from '../Consts.js';

const RecordConsentForm = (props) =>
{
  const [signerId, setSignerId]       = useState('')
  const [userId, setUserId]           = useState('')
  const [consentType, setConsentType] = useState(0)
  const [consentTypes, setConsentTypes] = useState([]);

  const handleSubmit = (event) =>
  {
    event.preventDefault();       
    props.onSubmit( signerId, userId, consentType );
  }

  const getConsentTypes = () => 
  {
    fetch(API_URL + "consenttype/")
      .then((response) => response.json())
      .then((data) => 
      {
        setConsentTypes(data);
      });
  };

  useEffect( () => 
  {
      setSignerId(props.signerId)
      setUserId('')
      setConsentType('');
      getConsentTypes();
  }, 
  [props.signerId] );

  return (
    <div className="recordConsentForm">   
        <form onSubmit={handleSubmit}>        
        <label htmlFor="signer">Signer:</label>
        <input type="text" id="signer" name="signer" value={signerId} onChange={e => setSignerId(e.target.value) }/>

        <label htmlFor="userid">User Identity:</label>
        <input type="text" id="userid" name="userid"  value={userId} onChange={e => setUserId(e.target.value)}/>

        {/* <label htmlFor="consenttype">Consent Type:</label>
        <input type="text" id="consenttype" name="consenttype" value={consentType} onChange={e => setConsentType (e.target.value)}/> */}

        <label htmlFor="consentTypeId">Consent Type:</label>
        <select name="consentTypeId" value={consentType}  onChange={ e => setConsentType(e.target.value) } >
          { consentTypes.map( (ct, idx) => 
            {
              return ( 
                <option key={idx} value={idx}>
                  {ct}
                </option>
              )
            })
          }
          </select>

        <input type="submit" />
        </form> 
    </div>
  )
}

export default RecordConsentForm;