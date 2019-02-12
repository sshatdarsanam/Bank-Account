const MyBank = artifacts.require("MyBank");
chai = require("chai")
expect = require("chai").expect;
const banking = require("../index")
var assert = require('assert');

contract("Creating a bank account", function(account) {
    describe("Enroll new users", function(){
        it("New Enrollment. Positive test-case", function(){
            return MyBank.new().then(function(instance){
                AccountBal = instance;
            });

        });
        it("Enrollment for new users. Negative test-case", async()=>{
            let newUser
            try{
                newUser = await MyBank.enroll(1, "User")
            }catch (err){

            }
            let status = newUser ? true : false
            assert.notEqual(status, true)
        })
    });
    describe ("Deposit funds in the account", function(){
        
        it("Deposit sufficient amount", async() => {
                        
            const account = await MyBank.deployed(); 
            const deposit = await account.deposit(1, 400);
            assert.notEqual(" ", deposit);

            // const EventDepositResult = {accountAddr: "User", amount: deposit};
            // const DepositMade = await account.allEvents();
            // const log = await new Promise(function(resolve, reject){
            //     return DepositMade.watch(function(err, log){
            //         resolve(log);
            //     });
            // });
            // const LogAddr = log.args.Address;
            // const Logamt = log.args.amount.toNumber();
            // assert.equal(LogAddr, EventDepositResult, "Event not emitted");
            // assert.equal(Logamt, EventDepositResult, "Amount property event not emitted");
        });
        it("Deposit for new users. Negative test-case", async()=>{
            let newUser
            try{
                newUser = await MyBank.deposit(1, "User")
            }catch (err){

            }
            let status = newUser ? true : false
            assert.notEqual(status, true)
        })

    });
    describe("Withdraw amount from the account", function(){
        it("Sufficient amount available to withdraw", async() => {
            const account = await MyBank.deployed(); 
            const withdraw = await account.withdraw(1, 400);
            assert.notEqual(" ", withdraw);

            // const EventWithdrawResult = {accountAddr: "User", amount: withdraw};
            // const WithdrawalMade = await account.allEvents();
            // const log = await new Promise(function(resolve, reject){
            //     WithdrawalMade.watch(async (err, log) =>{
            //         resolve(log);
            //     });
            // });
            // const LogAddr = log.args.Address;
            // const Logamt = log.args.amount.toNumber(3);
            // assert.equal(LogAddr, EventWithdrawResult, "Event not emitted");
            // assert.equal(Logamt, EventResult, "Amount property event not emitted");
            });
        });
        it("Withdraw amount from account. Negative test-case", async()=>{
            let newUser
            try{
                newUser = await MyBank.withdraw(1, "User")
            }catch (err){

            }
            let status = newUser ? true : false
            assert.notEqual(status, true)
        })
 
    describe("Check the balance after transactions", function(){
        it("Final available balance", function(){
            return AccountBal.balance(100).then(function(res){
                expect(res).to.not.be.an("error");
            });
        });
        it("Final balance in the account. Negative test-case", async()=>{
            let newUser
            try{
                newUser = await AccountBal.balance(1, "User")
            }catch (err){

            }
            let status = newUser ? true : false
            assert.notEqual(status, true)
        })
    });
    describe("Count the total customers", function(){
        it("Total count of customers", function(customerCount){
            customer = customerCount;
            return customerCount().then(function(res){
                expect(res).to.not.be.an.error("error");
            });
        });
        it("Total number of customers. Negative test-case", async()=>{
            let newUser
            try{
                newUser = await MyBank.customerCount(1, "User")
            }catch (err){

            }
            let status = newUser ? true : false
            assert.notEqual(status, true)
        })
    });
});
