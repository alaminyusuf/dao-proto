import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
// @ts-ignore
import { ethers } from 'hardhat';

const deployGovernanceToken: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log('Deploying Governance Token... 🌀');
  const governanceToken = await deploy('GovernanceToken', {
    from: deployer,
    args: [],
    log: true,
  });

  log(`Deployed governance Token on address ${governanceToken.address}`);

  const delegate = async (
    governanceTokenAddress: string,
    delegatedAccount: string
  ) => {
    const governanceToken = await ethers.getContractAt(
      'GovernanceToken',
      governanceTokenAddress
    );
    const tx = await governanceToken.delegate(delegatedAccount);
    await tx.wait(1);
    console.log(
      `Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`
    );
  };
  await delegate(governanceToken.address, deployer);
  log('Delegated✔️');
};

export default deployGovernanceToken;
