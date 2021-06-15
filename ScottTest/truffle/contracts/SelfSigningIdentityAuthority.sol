// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IdentityAuthority.sol";


contract SelfSigningIdentityAuthority is IdentityAuthority {

    function canSign(address _for, address _signer) public virtual override returns (bool) {
        return _for == _signer;
    }
}
