module.exports = 
{
    networks: 
    {
        development: 
        {
            host: "localhost",
            port: 9945,
            network_id: 1357,
            accounts: 5,
            defaultEtherBalance: 5000000000000
        },
    },

    compilers: 
    {
        solc: 
        {
            version: "0.8.4",

            settings: 
            {
                optimizer: 
                {
                    enabled: true
                },

                evmVersion: "istanbul"
            }
        }
    }
}
