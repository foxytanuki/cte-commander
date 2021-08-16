import { utils, PayableOverrides } from "ethers";
import { isBytesLike } from "ethers/lib/utils";
import { GuessTheSecretNumberChallenge__factory } from "../../types/ethers-contracts";
import { handleError, getWallet } from "../utils";

const CONTRACT_ADDRESS = "0x739ba08A85A3F3565D946dF5f7daFA7cadE5d679";

const main = async () => {
  const wallet = getWallet();
  // Refered: https://cmichel.io/capture-the-ether-solutions/
  const ans = await wallet.provider.getStorageAt(CONTRACT_ADDRESS, 0);

  const guesser = GuessTheSecretNumberChallenge__factory.connect(
    CONTRACT_ADDRESS,
    wallet
  );

  const overrides: PayableOverrides = {
    value: utils.parseEther("1"),
    gasLimit: "50000",
  };

  const result = await guesser.guess(ans, overrides);

  console.log(result);
};

main().catch(handleError);
