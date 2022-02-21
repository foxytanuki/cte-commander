import { ethers } from 'hardhat';
import { handleError, log } from '../../utils';

async function main() {
  const guessTheNumberContractAddr =
    '0x517f90a8331A04132F3f89Cc0Fd3f4954C378d96';

  const guessTheNumber = await ethers.getContractAt(
    'GuessTheNumberChallenge',
    guessTheNumberContractAddr
  );

  try {
    const result = await guessTheNumber.guess(42, {
      value: ethers.utils.parseEther('1'),
    });

    log.info(`Tx: ${result.hash}`);
    await result.wait();
    log.info(`Success!`);

    log.info(`isComplete: ${await guessTheNumber.isComplete()}`);
  } catch (e: unknown) {
    handleError(e);
  }
}

main().catch(handleError);
