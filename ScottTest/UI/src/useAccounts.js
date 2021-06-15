 fetch( "http://localhost:5050/account" )
          .then( (response) => response.json() )
          .then( (data) => 
          { 
            setAccounts(data);
          });  