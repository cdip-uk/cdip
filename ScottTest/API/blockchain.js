const Web3 = require("web3");

const web3 = new Web3("http://localhost:9945");

const fs = require('fs');
const consentJSON = JSON.parse( fs.readFileSync('../truffle/build/contracts/Consent.json', 'utf8') );

const networkId = 1357;

const contract_abi = consentJSON.abi;
const contract_address = consentJSON.networks[ networkId ].address;

const ConsentContract = new web3.eth.Contract(contract_abi, contract_address);

web3.eth.handleRevert = true;

const getAccounts = ( request, response ) => 
{
	console.log('Get Accounts');
 
 	web3.eth
	.getAccounts()
	.then( (accounts) => 
	{
		console.log( accounts );

		response
			.status(200)
			.send( accounts );
	});
}

const getAccountDetails = ( request, response ) => 
{
	console.log('Get Account Details');

 	const id = parseInt(request.params.id)
 
 	var details = {
 		id: id,
 		msg: 'GetAccountDetails not Implemented'
 	};
 	
	response.status(200).send(details);
}

const getLastId = ( request, response ) =>
{
	ConsentContract.methods.lastId()
        .call( ( err,res) => {

            if(err)
            {
                console.log("Error: " + err);
                response
					.status(500)
					.send( err );
            }

			response
			.status(200)
			.send( res );
        });

}

const recordConsent = ( request, response ) =>
{
	const userId = request.body.userId;
	const signerId = request.body.signerId;
	const consentType = request.body.consentType;

	console.log( request.body );
	console.log( userId 		);
	console.log( signerId 		);
	console.log( consentType	);

	ConsentContract
		.methods
		.recordConsent( userId, consentType )
		.send( { gas: 151290, gasPrice: 30000000, from: signerId }, ( err,res) => 
		{
			if(err)
			{
				response
					.status(500)
					.send( {msg: String(err) }  );
			}
			else
			{
				response.send( {msg:"Consent Added"} );
			}
		});
}

const getConsent = ( request, response ) =>
{
	const id = parseInt(request.params.id);

	ConsentContract.methods.getConsent( id )
	.call( ( err,res) => {

		if(err)
		{
			console.log("GC Error: " + err);
			response
				.status(500)
				.send( err );
		}
		
		response
			.status(200)
			.send( JSON.stringify(res) );

	});
}

// const getAllConsents = ( request, response ) =>
// {
// 	ConsentContract.methods.getConsent( id )
// 	.call( ( err,res) => {
// 
// 		if(err)
// 		{
// 			console.log("Error: " + err);
// 			response
// 				.status(500)
// 				.send( err );
// 		}
// 		
// 		response
// 			.status(200)
// 			.send( JSON.stringify(res) );
// 
// 	});
// }




module.exports = 
{
	getAccounts,
	getAccountDetails,
	getLastId,
	recordConsent,
	//getAllConsents,
	getConsent
}