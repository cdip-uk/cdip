import { useEffect } from 'react';
import Card from './Card';


export const NumConsentsCard = (props) => 
{
  useEffect( () => 
  {
    props.getNumConsents();
  });

  return (
    <Card stylename="lastid" header="Last Id">
      <p>Number of Consents: {props.numConsents}</p>
    </Card>
  );
};
