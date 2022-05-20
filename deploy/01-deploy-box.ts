import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
// @ts-ignore
import { ethers } from 'hardhat';

const deployBoxContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
     // @ts-ignore
     const { getNamedAccounts, deployments } = hre;
     const { deploy, log } = deployments;
     const deployer = await getNamedAccounts();
     log("Deploying...🌀")
     const box = await deploy("Box", {
         from: deployer as any,
         args: [],
         log: true,
     })

     const timeLock = await ethers.getContract("TimeLock")
     const boxContract = await ethers.getContractAt("Box", box.address)
     const transferOwnerTx = await boxContract. transferOwnerShip(timeLock.address)
     await transferOwnerTx.wait(1)
     log("Completed...✔️")
}

export default deployBoxContract