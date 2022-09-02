import { ethers } from "hardhat";

const main = async () => {
  const [ owner ] = await ethers.getSigners();
  const Landscape = await ethers.getContractFactory('Landscape', owner);
  const land = await Landscape.deploy();
  await land.deployed();

  console.log(`contract deployed at: ${land.address}`);
  console.log(`contract deploy tx hash: ${land.deployTransaction.hash}`);
  
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  })