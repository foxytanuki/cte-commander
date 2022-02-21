import { ethers } from 'hardhat';
import { handleError, log } from '../../utils';

async function main() {
  const nickname = 'foxytanuki';
  const captureTheEtherContractAddr =
    '0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee';
  const nicknameChallengecontractAddr =
    '0x1Fd17E5d63B0d71B00710Ba44957Ed4Ce9A0cACE';

  const captureTheEther = await ethers.getContractAt(
    'CaptureTheEther',
    captureTheEtherContractAddr
  );
  const nicknameChallenge = await ethers.getContractAt(
    'NicknameChallenge',
    nicknameChallengecontractAddr
  );

  try {
    const result = await captureTheEther.setNickname(
      // https://github.com/ethers-io/ethers.js/blob/7b134bd5c9f07f60b2e38b110268042e10f68174/packages/strings/src.ts/bytes32.ts#L9-L19
      ethers.utils.formatBytes32String(nickname)
    );

    log.info(`Tx: ${result.hash}`);
    await result.wait();
    log.info(`Success!`);

    log.info(`isComplete: ${await nicknameChallenge.isComplete()}`);
  } catch (e) {
    handleError(e);
  }
}

main().catch(handleError);
