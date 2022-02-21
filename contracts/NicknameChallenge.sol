pragma solidity ^0.4.21;

import './CaptureTheEther.sol';

contract NicknameChallenge {
    CaptureTheEther cte = CaptureTheEther(msg.sender);
    address player;

    // Your address gets passed in as a constructor parameter.
    function NicknameChallenge(address _player) public {
        player = _player;
    }

    // Check that the first character is not null.
    function isComplete() public view returns (bool) {
        return cte.nicknameOf(player)[0] != 0;
    }
}
