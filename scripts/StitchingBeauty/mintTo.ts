import { ethers } from "hardhat";

let contractAddr: string = "0x3C1AD35e36CE512D07BE9019a7398Bc8AF78f520";
let to: string = "0xebd9F25a5e961246dFC9B80d4CD7646Fe3b5b660";
let myUri: string = "https://ipfs.io/ipfs/QmSK7AsrJxDcfBsoQxNBwNDgoBb5ZgFZUtuhHWteiqr4Sy?filename=ACE.json";

const mint =async () => {
    const [owner] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("StitchingBeauty", owner);
    const nft = NFT.attach(contractAddr);

    await nft.mintTo(to, myUri)
        .then(tx => console.log(`tx : https://rinkeby.etherscan.io/tx/${tx.hash}`))
        .catch(err => console.error(err));
}

mint()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });