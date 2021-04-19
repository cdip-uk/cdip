pragma solidity ^0.8.0;


contract Info {

    address public owner_;

    constructor() {
        owner_ = msg.sender;
    }
    
}
