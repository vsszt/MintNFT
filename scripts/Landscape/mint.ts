import { ethers } from "hardhat";

let nftAddr = '0x229FcdAb2C9b42356dFaE7fa56d8a571b890c9f6';
let to = '0x45D8b99F991f34281d51B95211F45Df94b6bF04D';

const main = async () => {
    const [ owner ] = await ethers.getSigners();
    const Land = await ethers.getContractFactory('Landscape', owner);
    const land = Land.attach(nftAddr);
    
    console.log(`\nmint a NFT to ${to}`);
    await land.mintTo(to)
        .then((tx: any) => console.log(`tx hash: ${tx.hash}`))
        .catch((err: any) => console.error(err));
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });