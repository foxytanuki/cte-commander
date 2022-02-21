import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import { HardhatUserConfig } from 'hardhat/types';

import signer from './.secret';

const config: HardhatUserConfig = {
  defaultNetwork: 'ropsten',
  solidity: {
    compilers: [{ version: '0.4.26', settings: {} }],
  },
  networks: {
    hardhat: {},
    ropsten: {
      url: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      accounts: [signer.private],
    },
  },
};

export default config;
