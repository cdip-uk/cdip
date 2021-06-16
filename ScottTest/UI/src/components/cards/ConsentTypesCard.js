import { useEffect, useState } from 'react';
import Card from './Card';

import { API_URL } from '../../Consts.js';

export const ConsentTypesCard = (props) => 
{
  const [consentTypes, setConsentTypes] = useState([]);

  const getConsentTypes = () => 
  {
    fetch(API_URL + "consenttype/")
      .then((response) => response.json())
      .then((data) => 
      {
        setConsentTypes(data);
      });
  };
 
  useEffect( () => {
    getConsentTypes()
  }, [])

  return (
    <Card stylename="consentTypes" header="Consent Types">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
        {
          consentTypes.map( (ct, idx) => 
          { 
            return(
              <tr key={idx}>
                <td>{idx}</td>
                <td>{ct}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
      
    </Card>
  );
};
