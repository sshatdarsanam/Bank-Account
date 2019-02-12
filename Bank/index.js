const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const abi = require('./build/contracts/MyBank.json').abi;

function banking() {
    //const data = await web3.eth.net.isListening();
    //console.log(myfile); 
    const myBank = new web3.eth.Contract(abi, '0x2Af81B3779F682B0a34e027106007ab40fe12A14');
    return myBank;
}
module.exports = {
    banking: banking
};