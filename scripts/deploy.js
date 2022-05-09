const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  const gameContract = await gameContractFactory.deploy(
    ["Captain", "Thor", "Iron man"], // names
    ["https://i.pinimg.com/564x/1e/d0/0d/1ed00d7fcf893cfe305b4903243d9070.jpg", // images
    "https://i.pinimg.com/564x/b3/03/ec/b303ec6b705423b5de0e160c4e3a0f36.jpg", 
    "https://i.pinimg.com/564x/f9/6a/2b/f96a2b05cf23883ad4e3a82f70780465.jpg"],
    [200, 150, 100], // HP
    [50, 100, 100], // attack damage
    "Thanos",
    "https://i.pinimg.com/564x/9e/27/ba/9e27ba0ebcfc9031afa945eda4eaf719.jpg",
    10000,
    50
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);
  
  let txn;
  txn = await gameContract.mintCharacter(0);
  await txn.wait();
  console.log("Minted NFT #1");

  txn = await gameContract.mintCharacter(1);
  await txn.wait();
  console.log("Minted NFT #2");

  txn = await gameContract.mintCharacter(2);
  await txn.wait();
  console.log("Minted NFT #3");

  txn = await gameContract.mintCharacter(1);
  await txn.wait();
  console.log("Minted NFT #4");

  console.log("Done deploying and minting!");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();