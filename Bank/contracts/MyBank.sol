pragma solidity ^0.5.0;

contract MyBank {
    
    uint[] owners;
    mapping (uint => uint) private balances;
    
    //Write an event regarding the deposit and withdrawal about the address and the amount
    event DepositMade(uint accountAddress, uint amount);
    event WithdrawMade(uint accountAddress, uint amount);
    
    //Enroll new customers
    function enroll(uint ownerId, uint amount) public returns (uint) {
        balances[ownerId] = amount;
        owners.push(ownerId);   
    }
       
    //Deposit money into the bank account and emit the event with new balance
    function deposit(uint ownerId, uint amount) public payable returns (uint ) {
        for(uint i=0;i<owners.length;i++){
            if(ownerId==owners[i]){
                 balances[ownerId] += amount;
            }
        }
        emit DepositMade(ownerId, balances[ownerId]);
    }

    //Withdraw the amount and emit the event with new balance
    function withdraw(uint ownerId, uint withdrawAmount) public {
        if(withdrawAmount <= balances[ownerId]){
            balances[ownerId] -= withdrawAmount;
            emit WithdrawMade(ownerId, balances[ownerId]);
        }
    }

    //Return the current balance of the user 
    function balance(uint ownerId) public view returns (uint) {
        return balances[ownerId];
    }

    //Customer count will return the total number of users
    function customerCount() public view returns (uint) {
        return owners.length;
    }

}
