import "hardhat-deploy"
import "@nomiclabs/hardhat-ethers"
import "@typechain/hardhat"
import { HardhatUserConfig } from "hardhat/types"

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: "0.8.8",
// };

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: { 
    hardhat: {
      chainId: 31337
    }, 
    localhost: {
      chainId: 31337
    }
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  },
  solidity: "0.8.8"
} 

export default config