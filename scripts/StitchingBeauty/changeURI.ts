import { ethers } from "hardhat";

let newUri: string = "https://ipfs.io/ipfs/QmQNt3MpkWVLBJHG7oZu6w72QHG2kGEhZDN7cacDWHpTyJ?filename=ACE.json";
let contractAddr: string = "0x3C1AD35e36CE512D07BE9019a7398Bc8AF78f520";
let id: number = 1;

const main = async () => {
    const [owner] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("StitchingBeauty", owner);
    const nft = NFT.attach(contractAddr);

    await nft.changeURI(id, newUri)
        .then(tx => console.log(`tx : https://rinkeby.etherscan.io/tx/${tx.hash}`))
        .catch(err => console.error(err));
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });