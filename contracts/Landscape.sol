// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Landscape is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private currentTokenId;

    string public baseTokenURI;

    constructor() ERC721("Landscape", "LS") {
        baseTokenURI = "";
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseTokenURI(string memory _uri) public onlyOwner {
        baseTokenURI = _uri;
    }

    function mint2myself() public onlyOwner returns (uint256) {
        currentTokenId.increment();
        uint256 newTokenId = currentTokenId.current();
        _safeMint(msg.sender, newTokenId);
        return newTokenId;
    }

    function mintTo(address to) public onlyOwner returns (uint256) {
        currentTokenId.increment();
        uint256 newTokenId = currentTokenId.current();
        _safeMint(to, newTokenId);
        return newTokenId;
    }

    function burn(uint256 _id) public onlyOwner {
        _burn(_id);
    }
}