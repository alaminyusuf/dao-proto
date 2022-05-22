// @ts-ignore
import { ethers, network } from 'hardhat';
import * as fs from 'fs';
import {
  NEW_STORE_VALUE,
  FUNC,
  PROPOSAL_DESCRIPTION,
  developmentChains,
  VOTING_DELAY,
  proposalFile,
} from '../helper-hardhat-config';
import { moveBlocks } from '../uitls/move-block';

export async function propose(
  functionName: string,
  args: any[],
  proposalDesc: string
) {
  const governor = await ethers.getContract('GovernorContract');
  const box = await ethers.getContract('Box');
  const encodedFunctionCall = box.interface.encodeFunctionData(
    functionName,
    args
  );
  console.log(
    `Proposing ${encodedFunctionCall} to ${box.address} with arg ${args}`
  );
  console.log(`Proposal Description: \n ${proposalDesc}`);
  const proposeTx = await governor.propose(
    [box.address],
    [0],
    [encodedFunctionCall],
    proposalDesc
  );
  const proposeReciept = await proposeTx.wait(1);
  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_DELAY + 1);
  }
  const proposalId = proposeReciept.events[0].args.proposalId;
  let proposals = JSON.parse(fs.readFileSync(proposalFile, 'utf-8'));
  proposals[network.config.chainId!.toString()].push(proposalId.toString());
  fs.writeFileSync(proposalFile, JSON.stringify(proposals));
}

propose(FUNC, [NEW_STORE_VALUE], PROPOSAL_DESCRIPTION)
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
