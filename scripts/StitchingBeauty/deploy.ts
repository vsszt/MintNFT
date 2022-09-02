import { ethers } from "hardhat";
// import yargs from "yargs/yargs";

// const argv = yargs(process.argv.slice(2)).options({
//     name: { type: "string", default: "", alias: "n" },
// }).parseSync();

// let name: string = argv.name;

let name: string = "StitchingBeauty";

const main = async () => {
    const [owner] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory(name, owner);
    const contract = await Contract.deploy();
    await contract.deployed();

    console.log(`contract deployed at: ${contract.address}`);
    console.log(`contract deploy tx hash: ${contract.deployTransaction.hash}`);
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });