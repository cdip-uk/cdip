// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SelfSigningIdentityAuthority.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";


contract SimpleIdentityAuthority is SelfSigningIdentityAuthority, Ownable {

    event SignerAdded(address indexed _signer);
    event SignerRevoked(address indexed _signer);

    mapping (address => bool) internal signers_;

    function addSigner(address _signer) public onlyOwner returns (bool) {
        signers_[_signer] = true;
        emit SignerAdded(_signer);
        return true;
    }

    function revokeSigner(address _signer) public onlyOwner returns (bool) {
        signers_[_signer] = false;
        emit SignerRevoked(_signer);
        return true;
    }

    function canSign(address _for, address _signer) public override virtual returns (bool) {
        if (signers_[_signer]) {
            return true;
        }

        return super.canSign(_for, _signer);
    }

    
}
