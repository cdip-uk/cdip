pragma solidity ^0.8.0;


contract IdentityAuthority {

    function canSign(address _for, address _signer) public virtual returns (bool) {}
    
}
