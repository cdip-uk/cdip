const Web3 = require("web3");
const web3 = new Web3("http://localhost:9945");

const fs = require('fs');
const consentJSON = JSON.parse( fs.readFileSync('../truffle/build/contracts/Consent.json', 'utf8') );

const networkId = 1357;

const contract_abi = consentJSON.abi;
const contract_address = consentJSON.networks[ networkId ].address;

const ConsentContract = new web3.eth.Contract(contract_abi, contract_address);

var accounts = [];

async function getLastId()
{
    ConsentContract.methods.lastId()
        .call( ( err,res) => {

            if(err)
            {
                console.log("Error: " + err);
                return;
            }

            console.log("Last id : " + res);
        });
}


async function recordConsent()
{

    ConsentContract.methods.recordConsent( accounts[0], 1357)
        .send( {gas: 151290, gasPrice: 30000000, from: accounts[0] }, ( err,res) => {

            if(err)
            {
                console.log("Error: " + err);
                return;
            }

            console.log("add consent : " + res);
        });

}

async function getConsent( id )
{    
    ConsentContract.methods.getConsent( id )
        .call( ( err,res) => {

            if(err)
            {
                console.log("Error: " + err);
                return;
            }

            console.log("get consent : " + JSON.stringify(res) );
        });

}

async function init()
{
    accounts = await web3.eth.getAccounts();

    console.log("Account 0 => " + accounts[0]);

    await recordConsent();

    await getConsent(1);
}

init();
 

// 
// ConsentContract.methods.recordConsent( accounts[0], 1357)
//         .send( {gas: 151290, gasPrice: 30000000, from: accounts[0] }, ( err,res) => {
// 
//             if(err)
//             {
//                 console.log("Error: " + err);
//                 return;
//             }
// 
//             console.log("add consent : " + res);
//         });
// 
// ConsentContract.methods.getConsent( 1 )
//         .call( ( err,res) => {
// 
//             if(err)
//             {
//                 console.log("Error: " + err);
//                 return;
//             }
// 
//             console.log("get consent : " + JSON.stringify(res) );
//         });
// 
