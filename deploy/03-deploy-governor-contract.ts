import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {
  QUORUM_PERCENTAGE,
  VOTING_DELAY,
  VOTING_PERIOD,
} from './../helper-hardhat-config';
// @ts-ignore
import { ethers } from 'hardhat';

const deployGovernorContract: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const governanceToken = await get('GovernanceToken');
  const timeLock = await get('TimeLock');
  log('Deploying Governor Contract... 🌀');
  const governorContract = await deploy('GovernorContract', {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
      VOTING_DELAY,
      VOTING_PERIOD,
      QUORUM_PERCENTAGE,
    ],
    log: false,
  });
  log('Governor Contract Deployed✔️');
};

export default deployGovernorContract;
