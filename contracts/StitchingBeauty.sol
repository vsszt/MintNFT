// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract StitchingBeauty is ERC1155, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter public tokenId;

    mapping (uint256 => string) private _tokenURIs;

    event Mint(address to, string uri);
    event MintBatch(address to, string[] uris, uint256[] ids, uint256[] amounts);
    event Burn(address from, uint256 id, uint256 amount);
    event BurnBatch(address from, uint256[] ids, uint256[] amounts);
    event ChangeURI(string oldUri, string newUri, uint256 indexed id);

    constructor() ERC1155("") {}

    /**
     * @dev mint one nft at once
     * @param to address address of target account
     * @param myUri string uri of this token
     */
    function mintTo(address to, string memory myUri) public onlyOwner returns (uint256) {
        tokenId.increment();
        uint256 currentTokenId = tokenId.current();

        _setURI(currentTokenId, myUri);
        _mint(to, currentTokenId, 1, "");

        emit Mint(to, myUri);

        return currentTokenId;
    }

    /**
     * @dev batch mint ERC1155 NFT
     * @param to address target account of minting
     * @param num uint256 number of ERC1155 tokens that you want to mint
     * @param amounts uint256[] amounts of ERC1155 tokens that you want to mint
     */
    function mintToBatch(address to, string[] memory uris, uint256 num, uint256[] memory amounts) public onlyOwner returns (uint256[] memory) {
        uint256[] memory ids = new uint256[](num);

        // check two arrays length if equal or not
        _lengthEqual(ids, amounts);

        tokenId.increment();
        for (uint256 i = 0; i < ids.length; i++) {
            ids[i] = tokenId.current();
            _setURI(ids[i], uris[i]);
            tokenId.increment();
        }
        _mintBatch(to, ids, amounts, "");

        emit MintBatch(to, uris, ids, amounts);

        return ids;
    }

    /**
     * @dev burn a nft at once
     * @param from address target account address of burning operation
     * @param id uint256 token id of NFT
     * @param amount uint256 amount of NFTs that will be burned
     */
    function burn(address from, uint256 id, uint256 amount) public onlyOwner {
        _exists(id);
        _burn(from, id, amount);
        delete _tokenURIs[id];
        emit Burn(from, id, amount);
    }

    /**
     * @dev batch burn NFT
     * @param from address target account address of burning operation
     * @param ids uint256[] arrary of id of NFT
     * @param amounts uint256[] array of amounts of NFT
     */
    function burnBatch(address from, uint256[] memory ids, uint256[] memory amounts) public onlyOwner {
        // check tokenURI exist or not
        for (uint256 i =  0; i < ids.length; i++) {
            _exists(ids[i]);
        }

        // check two arrays length if equal or not
        _lengthEqual(ids, amounts);

        _burnBatch(from, ids, amounts);
        // delete all burning token uri which given ids
        for (uint256 i = 0; i < ids.length; i++) {
            delete _tokenURIs[ids[i]];
        }

        emit BurnBatch(from, ids, amounts);
    }

    function _setURI(uint256 _id, string memory _uri) internal {
        _tokenURIs[_id] = _uri;
    }

    function checkURI(uint256 id) view public returns (string memory) {
        _exists(id);
        return _tokenURIs[id];
    }

    function changeURI(uint256 id, string memory newUri) public onlyOwner {
        require(bytes(_tokenURIs[id]).length > 0, "tokenURI must be exist");
        string memory oldUri = _tokenURIs[id];
        _tokenURIs[id] = newUri;
        emit ChangeURI(oldUri, newUri, id);
    }

    function uri(uint256 id) public view override returns (string memory) {
        string memory tokenURI = _tokenURIs[id];

        return bytes(tokenURI).length > 0 ? tokenURI : "";
    }

    function _exists(uint256 id) view internal {
        require(bytes(_tokenURIs[id]).length > 0, "token uri must exist");
    }

    function _lengthEqual(uint256[] memory a, uint256[] memory b) pure internal {
        require(a.length == b.length, "two arrays length are not equal");
    }

}