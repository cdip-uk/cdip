import Card from './Card';

export const MetaMaskCard = (props) => {

  const setupEth = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        props.setMetaMaskAccount(accounts[0]);

        console.log("User allowed access ");
      }
      catch (error) {
        if (error.code === 4001) {
          console.log("User denied account access");
        }

        // setError(error);
      }
    }
  };

  return (
    <Card stylename="metamask" header="Metamask">
      <div>
        <button onClick={setupEth}>Connect to Metamask</button>
        <p>Metamask account: {props.metaMaskAccount}</p>
      </div>
    </Card>
  );
};
