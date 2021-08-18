import { utils, PayableOverrides } from 'ethers';
import { GuessTheNumberChallenge__factory } from '../../types/ethers-contracts';
import { handleError, getWallet } from '../utils';

const CONTRACT_ADDRESS = '0xB841e47509C3Ceba3E9d6724EEAED405CC16106f';

const main = async () => {
  const wallet = getWallet();

  const guesser = GuessTheNumberChallenge__factory.connect(
    CONTRACT_ADDRESS,
    wallet
  );
  const ans = 42;
  const overrides: PayableOverrides = {
    value: utils.parseEther('1'),
    gasLimit: '50000',
  };

  const result = await guesser.guess(ans, overrides);

  console.log(result);
};

main().catch(handleError);
