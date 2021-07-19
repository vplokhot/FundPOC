const FundToken = artifacts.require("FundToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function(callback){
    const accounts = await new web3.eth.getAccounts();
    const owner = accounts[0];
    const fundToken = await FundToken.deployed();
    const farmToken = await FarmToken.deployed();

    const allowBefore = await fundToken.allowance(owner, farmToken.address);
    console.log("Allow Before : ", allowBefore.toString())

    await fundToken.approve(farmToken.address, web3.utils.toWei("100", "ether"));

    const allowAfter = await fundToken.allowance(owner, farmToken.address);
    console.log("Allow Current : ", allowAfter.toString())




    const initialBalanceFund = await fundToken.balanceOf(owner)
    const initialBalanceFarm = await fundToken.balanceOf(farmToken.address)
    
    console.log("*** FUND TOKEN ***")
    console.log("initialBalanceFund : ", initialBalanceFund.toString())
    console.log("initialBalanceFarm : ", initialBalanceFarm.toString())

    const initialFarmBalance = await farmToken.balanceOf(owner)
    const initialFundInFarm = await farmToken.balanceOf(farmToken.address)

    console.log("*** FARM TOKEN ***")
    console.log("initialFarmBalance : ", initialFarmBalance.toString())
    console.log("initialFundInFarm : ", initialFundInFarm.toString())

    console.log("*** CALLING DEPOSIT ***")
    await farmToken.deposit(web3.utils.toWei("80", "ether"))


    
    console.log("*** FUND TOKEN  AFTER ***")
    const postBalanceFund = await fundToken.balanceOf(owner)
    const postBalanceFarm = await fundToken.balanceOf(farmToken.address)
    console.log("postBalanceFund : ", postBalanceFund.toString())
    console.log("postBalanceFarm : ", postBalanceFarm.toString())

    const postFarmBalance = await farmToken.balanceOf(owner)
    const postFundInFarm = await farmToken.balanceOf(farmToken.address)

    console.log("*** FARM TOKEN AFTER ***")
    console.log("postFarmBalance : ", postFarmBalance.toString())
    console.log("postFundInFarm : ", postFundInFarm.toString())

    
    callback()
}