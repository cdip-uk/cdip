import './css/Card.css';

const Card = (props) =>
{
  return (

      <div className={`card ${props.stylename}`}>
        
        <div id="header">
          <h2>{props.header}</h2>
        </div>

        <div id="body">
          {props.children}
        </div>

      </div>
  );
}

export default Card;
