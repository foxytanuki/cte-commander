import { ethers } from 'hardhat';
import { handleError, log } from '../../utils';

async function main() {
  const contractAddr = '0x7ED58b91278F4d4C2bad4af1B8321885fE0D7ede';
  const callMeChallenge = await ethers.getContractAt(
    'CallMeChallenge',
    contractAddr
  );

  try {
    const result = await callMeChallenge.callme();

    log.info(`Tx: ${result.hash}`);
    await result.wait();
    log.info(`Success!`);
  } catch (e) {
    handleError(e);
  }
}

main().catch(handleError);
