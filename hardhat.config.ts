import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: "0.8.8",
// };

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  solidity: '0.8.8',
};

export default config;
