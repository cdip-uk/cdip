import { useState, useEffect } from 'react';
import Card from './Card';
import { API_URL } from '../../Consts.js';

/**********************************************************************************/
export const ConsentCard = (props) => 
{

  const [consents, setConsents] = useState([]);

  useEffect( () => {

      const getConsents = async () =>
      {
        console.log("getting consents: " + props.id);

        await fetch(API_URL + "consent/")
            .then((response) => response.json())
            .then((consentList ) => {
              setConsents( consentList )
            });
        
      };

    getConsents();

  }, [props.id] )
  
    return (
    <Card stylename="consents" header="Consents">
      <p>Latest Consent: {props.id}</p>
      <table>
        <thead>
          <tr>
            <th>Identity</th>            
            <th>Consent Type</th>
            <th>Time</th>
            <th>Signer</th>
          </tr>
        </thead>
        <tbody>
          {
           consents.map( (consent, idx) => {
            return (
                  <tr key={idx}>
                    <td>{consent[0]}</td>
                    <td>{consent[2]}</td>
                    <td>
                    {
                      new Date(Number(consent[3]) * 1000).toDateString()
                    }
                    </td>
                    <td>{consent[1]}</td>                    
                  </tr>
            )
          })
        }
        </tbody>
      </table>
    </Card>
  );
};
