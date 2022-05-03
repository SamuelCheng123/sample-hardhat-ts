const { deploy } = require("@openzeppelin/hardhat-upgrades/dist/utils");
const { BigNumber } = require("@ethersproject/bignumber");
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const { ethers, upgrades , run } = require("hardhat");


async function main() {
  let deployer      :SignerWithAddress;
  let tierLDAHolder : SignerWithAddress;
  let testers       :SignerWithAddress[] = [];
  [
    deployer,
    tierLDAHolder,
    ...testers
  ] = await ethers.getSigners();

  // Using true USDC on the mainnet
  //   mintableUSDC
  //   const MintableUSDC = await ethers.getContractFactory("MintableUSDC");
  //   let mintableUSDC = await MintableUSDC.deploy();
  //   await mintableUSDC.deployed();    

  // movieArtV1
  const MovieArtV1 = await ethers.getContractFactory("MovieArtV1");
  let movieArtV1 = await upgrades.deployProxy(
      MovieArtV1,
      ['' , ''],  // tokenURI , contractURI_
      {
      initializer: "__MovieArt1155_init",
      kind: "uups",
      }
  );
  await movieArtV1.deployed();
  console.log('movieArtV1 address:' , movieArtV1.address);

  // MovieArtNoReservationPurchaseLDA
  const MovieArtNoReservationPurchaseLDA = await ethers.getContractFactory("MovieArtNoReservationPurchaseLDA");
  let movieArtNoReservationPurchaseLDA = await upgrades.deployProxy(
      MovieArtNoReservationPurchaseLDA,
      [deployer.address],  // paymentWallet
      {
      initializer: "__NoReservationPurchaseLDA__init",
      kind: "uups",
      }
  );
  await movieArtNoReservationPurchaseLDA.deployed();
  console.log('movieArtNoReservationPurchaseLDA address' , movieArtNoReservationPurchaseLDA.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });