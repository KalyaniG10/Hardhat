// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

import "hardhat/console.sol";

contract Token{
  string public name="Hardhat Token";
  string public symbol="HHT";
  uint public totalSupply=10000;

  address public owner;

  mapping (address=>uint) balances;

  constructor(){
   balances[msg.sender]=totalSupply;
   owner=msg.sender;
}
    
     function transfer(address to, uint amount) external{
           console.log("**sender balance is %s tokens**",balances[msg.sender]);
           console.log("**sender is sending %s tokenks to %s address**",amount,to);
           require(balances[msg.sender]>=amount,"Not enough balance");
           balances[msg.sender]-=amount;
           balances[to]+=amount;
   }
      
      function balanceof(address account) external view returns(uint){

          return balances[account];
      } 
}
