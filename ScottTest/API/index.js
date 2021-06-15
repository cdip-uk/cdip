 const dotenv = require('dotenv')
dotenv.config();

var express = require('express');
var cors = require('cors');

var app = express();

const blockchain = require('./blockchain.js');

var portnum = process.env.API_PORT;

app.use( cors() );
app.use( express.urlencoded( {extended: true} ) );
app.use( express.json() );

app.listen( portnum, () => 
{
	console.log('API running on port ' + portnum);
});

/* ------------------------------------------------------------------- */
// app.get( "/account/:id", blockchain.getAccountDetails );

/* ------------------------------------------------------------------- */
app.get( "/account", blockchain.getAccounts );

/* ------------------------------------------------------------------- */
app.get( "/consent/total", blockchain.getLastId );

// -------------------------------------------------------------------
// app.get( "/consent/total", blockchain.getAllConsents );

/* ------------------------------------------------------------------- */
app.get( "/consent/:id", blockchain.getConsent );

/* ------------------------------------------------------------------- */
app.post( "/consent/", blockchain.recordConsent );




