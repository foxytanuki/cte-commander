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
      url: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    },
  },
};

export default config;
