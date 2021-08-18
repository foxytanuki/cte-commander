import { utils, PayableOverrides, ContractReceipt } from 'ethers';
import { PredictTheBlockHashChallenge__factory } from '../../types/ethers-contracts';
import { handleError, getWallet } from '../utils';

const CONTRACT_ADDRESS = '0x7c995EF8a735ACEe62cA8493B9887f4123BaA201';

const pause = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {
  const wallet = getWallet();

  const challenge = PredictTheBlockHashChallenge__factory.connect(
    CONTRACT_ADDRESS,
    wallet
  );

  const overrides: PayableOverrides = {
    value: utils.parseEther('1'),
    gasLimit: '150000',
  };

  const tx = await challenge.lockInGuess(
    '0x0000000000000000000000000000000000000000000000000000000000000000',
    overrides
  );
  const receipt: ContractReceipt = await tx.wait();
  console.log(receipt.blockNumber);

  const initialBlockNumber = receipt.blockNumber;
  let currentBlockNumber = initialBlockNumber;

  while (currentBlockNumber <= initialBlockNumber + 256) {
    currentBlockNumber = await wallet.provider.getBlockNumber();
    console.log(initialBlockNumber, currentBlockNumber);
    await pause(1000);
  }

  challenge.settle();
};

main().catch(handleError);
