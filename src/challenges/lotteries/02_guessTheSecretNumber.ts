import { ethers } from 'hardhat';
import { handleError, log } from '../../utils';

function bruteForce(hash: string) {
  const uint8 = new Uint8Array(1);
  for (let i = 0; i < 256; i++) {
    uint8[0] = i;
    if (ethers.utils.keccak256(uint8) === hash) {
      return i;
    }
  }
  throw new Error('Could not find the answer');
}

async function main() {
  const guessTheSecretNumberContractAddr =
    '0x59c0692e7dcE478Aabca47f6DDE82FF09f39f936';
  const guessTheSecretNumber = await ethers.getContractAt(
    'GuessTheSecretNumberChallenge',
    guessTheSecretNumberContractAddr
  );
  const answerHash =
    '0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365';

  try {
    const answer = bruteForce(answerHash);
    const result = await guessTheSecretNumber.guess(answer, {
      value: ethers.utils.parseEther('1'),
    });

    log.info(`Tx: ${result.hash}`);
    await result.wait();
    log.info(`Success!`);

    log.info(`isComplete: ${await guessTheSecretNumber.isComplete()}`);
  } catch (e: unknown) {
    handleError(e);
  }
}

main().catch(handleError);
