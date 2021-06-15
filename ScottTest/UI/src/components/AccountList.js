import './css/AccountList.css';

const AccountList = (props) =>
{
  if ( props.accounts === null )
    return null;

  return (
    <div className="AccountList">
      <ul>
        {
          props.accounts.map( (a, idx) => {
            return(
              <li key={idx}>{a}</li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default AccountList;
