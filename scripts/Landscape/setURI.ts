import { ethers } from "hardhat";

let nftAddr = "0x229FcdAb2C9b42356dFaE7fa56d8a571b890c9f6";
let uri = "https://bafybeihhkddtulbqiy2ktto25oc4z3wtu5oelsnmwaizbc2672dxre3fw4.ipfs.nftstorage.link/landscape/";

const setURI = async () => {
    const [ owner ] = await ethers.getSigners();
    const Land = await ethers.getContractFactory('Landscape', owner);
    const land = Land.attach(nftAddr);

    console.log(`set base URI...`);
    await land.setBaseTokenURI(uri).then((res: any) => console.log(res.hash)).catch((err: any) => console.error(err));
}

setURI().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
})