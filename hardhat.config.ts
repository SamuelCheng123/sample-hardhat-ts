import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-etherscan";

// import "@openzeppelin/hardhat-defender";

require("dotenv").config();
import "./tasks";
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
      version: "0.8.7",
      settings: {
          optimizer: {
              enabled: true,
              runs: 200
          }
      }
  },
  networks: {
      localhost: {
          url: "http://127.0.0.1:8545"
      },
      mainnet: {
          url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`,
          accounts: process.env.DEV_PRIVATE_KEY !== undefined ? [process.env.DEV_PRIVATE_KEY] : [],
          gasPrice: 200000000000,
      },
      rinkeby: {
          url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_RINKEBY_API_KEY}`,
          accounts: process.env.DEV_PRIVATE_KEY !== undefined ? [process.env.DEV_PRIVATE_KEY] : [],
      },
      matic:{
          url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_RINKEBY_API_KEY}`,
          accounts: [`0x${process.env.DEV_PRIVATE_KEY}`],
      },
      mumbai:{
        url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_RINKEBY_API_KEY}`,
        accounts: [`0x${process.env.DEV_PRIVATE_KEY}`],
      },


      hardhat: {
        allowUnlimitedContractSize: true,
        mining: {
          auto: true,
          interval: [13 * 1000, 15 * 1000],
        },
        forking: {
          url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`,
          blockNumber: 12772572,
        },
      },
  },
  mocha: {
      timeout: 100000
  },
  etherscan: {
      apiKey: process.env.ETHERSCAN_API,
  },
}


export default config;