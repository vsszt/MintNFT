import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { moonbuilder, owner, vsstian } from "./secrets.json";
import dotenv from "dotenv";
import { ethers } from "hardhat";
// import { ethers } from "hardhat";

dotenv.config();

task("balance", "Print given account's balance number")
  .addParam("a", "target account")
  .setAction(async (taskArg, hre) => {
    const balance = await hre.ethers.provider.getBalance(taskArg.a);
    console.log(`Balance: ${hre.ethers.utils.formatEther(balance)} eth`);
  });

// task("showURI", "show a uri which match a given account's tokenId")
//   .addParam("name", "contract name")
//   .addParam("addr", "contract addr")
//   .addParam("id", "token id")
//   .setAction(async (taskArg, hre) => {
//     const Contract = await hre.ethers.getContractFactory(taskArg.name);
//     const contract = attach(taskArg.addr);
//   });

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    eth: {
      url: "https://mainnet.infura.io/v3/d0110e45425f41298c741c1144d6c964",
      chainId: 1,
      accounts: [
        vsstian
      ]
    },
    bsc: {
      url: "https://bsc-dataseed2.binance.org",
      chainId: 56,
      accounts: [
        moonbuilder
      ]
    },
    bsctest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: [
        moonbuilder
      ]
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/7e5G3O7-riM_mBMdsmeyLj-t-MTD0FbD`,
      accounts: [ owner ]
    }
  }
};

export default config;
