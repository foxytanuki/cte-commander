import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import { HardhatUserConfig } from "hardhat/types";

const config: HardhatUserConfig = {
  defaultNetwork: "ropsten",
  solidity: {
    compilers: [{ version: "0.7.4", settings: {} }],
  },
  networks: {
    hardhat: {},
    ropsten: {
      url: process.env.RPC_HOST,
    },
  },
};

export default config;
