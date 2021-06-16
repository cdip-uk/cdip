const dotenv = require('dotenv')
dotenv.config();

const Web3 = require("web3");

const web3 = new Web3( process.env.ETHEREUM_URL );
web3.eth.handleRevert = true;

const fs = require('fs');

const consentJSON = JSON.parse( fs.readFileSync('../truffle/build/contracts/Consent.json', 'utf8') );
const consentContract_address = consentJSON.networks[ process.env.NETWORK_ID ].address;
const ConsentContract = new web3.eth.Contract( consentJSON.abi, consentContract_address);

const consentTypeMapperJSON = JSON.parse( fs.readFileSync('../truffle/build/contracts/ConsentTypeMapper.json', 'utf8') );
const consentTypeMapperContract_address = consentTypeMapperJSON.networks[ process.env.NETWORK_ID ].address;
const ConsentTypeMapperContract = new web3.eth.Contract( consentTypeMapperJSON.abi, consentTypeMapperContract_address );


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

const getAllConsents = async ( request, response ) =>
{
	var numConsents = await ConsentContract.methods.lastId()
        .call( ( err,res) => 
		{
            if(err)
            {
                console.log("Error: " + err);
                response
					.status(500)				
					.send( err );
            }	

			return res;
		});

	var consents = [];

	for( var i = 0 ; i < numConsents; i++)
	{
		await ConsentContract.methods.getConsent( i )
			.call( ( err,res) => 
			{
				if(err)
				{
					console.log("GC Error: " + err);
					response
						.status(500)
						.send( err );
				}
												
				console.log("add consent " + res);
				consents.push( res );
			});				
	}

	console.log("add consent - return" );
	
	response
		.status(200)
		.send( JSON.stringify( consents ) );     
}

const addConsentType = ( request, response ) =>
{
	const consentType = request.body.consentType;
	const signerId = request.body.signerId;

	ConsentTypeMapperContract
		.methods
		.addConsentType( consentType )
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
				response.send( {msg:"Consent Type Added"} );
			}
		});
}


const getAllConsentTypes = ( request, response ) => 
{
	console.log('Get Consent Types');
 
	ConsentTypeMapperContract.methods.getConsentTypes()
	.call( ( err,res) => 
	{
		if(err)
		{
			response
				.status(500)
				.send( err );
		}
		
		response
			.status(200)
			.send( JSON.stringify(res) );
	});
}

const getNumConsentTypes = ( request, response ) => 
{
	console.log('Get Num  Consent Types');
 
	ConsentTypeMapperContract.methods.getNumConsentTypes()
	.call( ( err,res) => 
	{
		if(err)
		{
			response
				.status(500)
				.send( err );
		}
		
		response
			.status(200)
			.send( JSON.stringify(res) );
	});
}

module.exports = 
{
	getAccounts,
	getAccountDetails,
	getLastId,
	recordConsent,
	
	getAllConsents,
	getConsent,

	addConsentType,
	getNumConsentTypes,
	getAllConsentTypes
}