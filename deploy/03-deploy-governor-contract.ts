import { QUORUM_PERCENTAGE, VOTING_DELAY, VOTING_PERIOD } from "./../helper-hardhat-config";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployGovernorContract: DeployFunction = async function(hre: HardhatRuntimeEnvironment){
    // @ts-ignore
    const {getNamedAccounts, deployments} = hre
    const {deploy, log, get} = deployments;
    const {deployer} = await getNamedAccounts()
    const governanceToken = await get("GovernanceToken")
    const timeLock = await get("TimeLock")
    log("Deploying Governor Contract...")
    const governorContract = await deploy("GovernorContract", {
        from: deployer as any,
        args: [
                governanceToken.address,
                timeLock.address,
                VOTING_DELAY, 
                VOTING_PERIOD, 
                QUORUM_PERCENTAGE
            ],
        log: true,
        }, 
    )
}

export default deployGovernorContract