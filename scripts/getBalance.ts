import { ethers } from "hardhat";

const main = async () => {
    const [ owner ] = await ethers.getSigners();
    let balance = await owner.getBalance();
    console.log(`Balance is: ${ethers.utils.formatEther(balance)} ETH`);
    
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });