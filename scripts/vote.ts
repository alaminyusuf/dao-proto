// @ts-ignore
import { ethers, network } from 'hardhat';
import * as fs from 'fs';
import {
  developmentChains,
  VOTING_PERIOD,
  proposalFile,
} from './../helper-hardhat-config';
import { moveBlocks } from '../uitls/move-block';

const index = 0;

export async function main(proposalIndex: number) {
  const proposals = JSON.parse(fs.readFileSync(proposalFile, 'utf-8'));
  const proposalId = proposals[network.config.chainId!][proposalIndex];
  const governor = await ethers.getContract('GovernorContract');
  const voteWay = 1;
  const reason = 'this is vote resaon📔';
  const voteTxResponse = await governor.castVote(proposalId, voteWay);
  console.log('Vote Transaction', voteTxResponse);
  // await voteTxResponse.wait(1);
  if (developmentChains.includes(network.name)) {
    moveBlocks(VOTING_PERIOD + 1);
  }
  console.log('Voted ✔️ Ready to Go 👍');
}

main(index)
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
