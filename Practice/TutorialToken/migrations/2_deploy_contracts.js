var Token = artifacts.require('TutorialToken');

module.exports = function(deployer) {
    deployer.deploy(Token);
};