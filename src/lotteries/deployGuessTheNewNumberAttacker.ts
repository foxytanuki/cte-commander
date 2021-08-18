import { ethers } from "hardhat";
import { handleError, getWallet } from "../utils";
import { IGuessTheNewNumberChallenge__factory } from "../../typechain";

const main = async () => {
  const wallet = getWallet();

  const challengeAddress = "0x92c013d5Db256D58FF142F5DBD9B4Bf001aEE8Cd";

  const attackerFactory = await ethers.getContractFactory(
    "GuessTheNewNumberAttacker",
    wallet
  );
  const attacker = await attackerFactory.deploy(challengeAddress);
  console.log(attacker);
};

main().catch(handleError);
