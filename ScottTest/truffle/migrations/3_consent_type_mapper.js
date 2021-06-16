const ConsentTypeMapper = artifacts.require("ConsentTypeMapper");

module.exports = function (deployer) 
{
    deployer.deploy(ConsentTypeMapper);
}