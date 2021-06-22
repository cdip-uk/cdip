#! /bin/sh

npm install > "/dev/null" 2>&1 &&
    truffle compile --contracts_directory ./migration_contract --contracts_build_directory /build --network development &&
    truffle migrate --contracts_build_directory /build --network development &&
    tail -f /dev/null
