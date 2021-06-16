// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/utils/Counters.sol";

contract ConsentTypeMapper
{
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private lastConsentTypeId_;
    mapping (uint256 => string) internal consentNames_;

    constructor()
    {
        // lastConsentTypeId_ = 0;
    }

    function getNumConsentTypes() public view returns (uint256) {
        return lastConsentTypeId_.current();
    }

    function addConsentType( string memory consentName ) public 
    {
        uint256 consentTypeId  = lastConsentTypeId_.current();

        consentNames_[ consentTypeId ] = consentName;

        lastConsentTypeId_.increment();
        
    }


    function getConsentTypes() public view returns ( string [] memory)
    {
        uint256 numConsentNames = lastConsentTypeId_.current();

        string [] memory ret = new string[] ( numConsentNames);

        for ( uint i = 0; i < numConsentNames; i++)
        {
            ret[i] = consentNames_[i];
        }

        return ret;
    }
}