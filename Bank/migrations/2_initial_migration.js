var Migrations = artifacts.require("./MyBank.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
