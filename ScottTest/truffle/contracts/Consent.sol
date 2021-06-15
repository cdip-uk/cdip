// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IdentityAuthority.sol";
import "./SimpleIdentityAuthority.sol";
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/utils/Counters.sol";


contract Consent {
    using SafeMath for uint256;
    using Counters for Counters.Counter;


    event ConsentRecorded(address indexed _identity,
                          address indexed _signer,
                          uint256 indexed _consentType);

    struct SignedConsent {
        uint256 uid;
        address identity;
        address signer;
        uint256 consentType;
        uint256 timestamp;
    }

    address public creator_;
    Counters.Counter private consentIds_;
    mapping (uint256 => SignedConsent) internal consents_;
    IdentityAuthority public authority_;
    

    constructor() {
        creator_ = msg.sender;
        authority_ = new SimpleIdentityAuthority();
    }

    function lastId() public view returns (uint256) {
        return consentIds_.current();
    }

    function recordConsent(address _identity,
                           uint256 _consentType)
        public validSigner(_identity) returns (bool) 
    {
        consentIds_.increment();
        uint256 uid = consentIds_.current();

        consents_[uid].uid = uid;
        consents_[uid].identity = _identity;
        consents_[uid].signer = msg.sender;
        consents_[uid].consentType = _consentType;
        consents_[uid].timestamp = block.timestamp;

        emit ConsentRecorded(_identity, msg.sender, _consentType);
    
        return true;
    }

    function getConsent(uint256 _id) public view
        returns (address, address, uint256, uint256) 
    {
        address identity = consents_[_id].identity;
        address signer = consents_[_id].signer;
        uint256 consentType = consents_[_id].consentType;
        uint256 time = consents_[_id].timestamp;

        return (identity, signer, consentType, time);
    }


    modifier validSigner(address _identity) 
    {
        require(authority_.canSign(_identity, msg.sender), "Invalid Signer");
        _;
    }
}
