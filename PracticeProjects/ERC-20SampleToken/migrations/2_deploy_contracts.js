var SampleToken = artifacts.require('SampleToken');

module.exports = function (deployer) {
  deployer.deploy(SampleToken, 999);
};
