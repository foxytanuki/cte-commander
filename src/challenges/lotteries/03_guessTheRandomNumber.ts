import { ethers } from 'hardhat';
import { handleError, log } from '../../utils';

async function main() {
  const guessTheRandomNumberContractAddr =
    '0x1fdD342d470b209FA2e7c64997011c7A18F80670';

  const guessTheRandomNumber = await ethers.getContractAt(
    'GuessTheRandomNumberChallenge',
    guessTheRandomNumberContractAddr
  );

  try {
    const answer = await ethers.provider.getStorageAt(
      guessTheRandomNumberContractAddr,
      0
    );

    log.info('Call guessProxy()');
    const result = await guessTheRandomNumber.guess(answer, {
      value: ethers.utils.parseEther('1'),
    });

    log.info(`Tx: ${result.hash}`);
    await result.wait();
    log.info(`Success!`);

    log.info(`isComplete: ${await guessTheRandomNumber.isComplete()}`);
  } catch (e) {
    handleError(e);
  }
}

main().catch(handleError);
