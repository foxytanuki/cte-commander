import { ethers } from 'hardhat';
import { handleError, getWallet } from '../../utils';
import { IGuessTheNewNumberChallenge__factory } from '../../typechain';

const main = async () => {
  const wallet = getWallet();

  const challengeAddress = '0x7d8484FA7FA726547a2660E625D7f549c4Dd2279';

  const attackerFactory = await ethers.getContractFactory(
    'PredictTheFutureAttacker',
    wallet
  );
  const attacker = await attackerFactory.deploy(challengeAddress);
  console.log(attacker);
};

main().catch(handleError);
