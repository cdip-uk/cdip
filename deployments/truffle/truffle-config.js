module.exports = {

    contracts_build_directory: process.env.CONTRACTS_DIR || "./build/contracts",
    
    networks: {
        development: {
            host: process.env.GANACHE_HOST,
            port: process.env.GANACHE_PORT,
            network_id: process.env.GANACHE_NETWORK,
            accounts: 5,
            defaultEtherBalance: 500
        }
    },

    compilers: {
        solc: {
            version: process.env.SOLC_VERSION,
            settings: {
                optimizer: {
                    enabled: true
                },
                evmVersion: "istanbul"
            }
        }
    }
}
