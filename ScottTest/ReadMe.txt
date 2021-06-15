Dev Tool
--------

This is an experimental prototype to experiment with accesing an Ethereum blockchain from a React UI via a Node Express API.
When appropriate, this code shuold be merged into the main framework but is in a separate folder for the moment.

Instructions
------------

To run the system:

    ./runganache.sh
        This starts an instance of ganache (an ethereum block chain provider) on port 9945, with 4 accounts

    ./runtruffle.sh
        This will build the solidity contracts and migrate them to the previously started Ganache backend.

    ./runapi.sh
        This starts a Node based API, using the Express package, on port 5050. A consent contract is added as a test. 

    ./runui.sh
        This starts the React UI

