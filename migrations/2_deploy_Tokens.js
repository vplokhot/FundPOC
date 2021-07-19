const FundToken = artifacts.require("FundToken");
const FarmToken = artifacts.require("FarmToken")
module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(FundToken);
  const fundToken = await FundToken.deployed();

  await deployer.deploy(FarmToken, fundToken.address);
  const farmToken = await FarmToken.deployed();
};
