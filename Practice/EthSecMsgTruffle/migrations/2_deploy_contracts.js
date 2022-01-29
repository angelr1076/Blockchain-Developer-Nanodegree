var Message = artifacts.require("Message");

module.exports = function(deployer) {
  deployer.deploy(Message);
};