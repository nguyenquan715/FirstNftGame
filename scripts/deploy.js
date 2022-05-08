const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  const gameContract = await gameContractFactory.deploy(
    ["Captain", "Thor", "Iron man"], // names
    ["https://i.pinimg.com/564x/1e/d0/0d/1ed00d7fcf893cfe305b4903243d9070.jpg", // images
    "https://i.pinimg.com/564x/b3/03/ec/b303ec6b705423b5de0e160c4e3a0f36.jpg", 
    "https://i.pinimg.com/564x/f9/6a/2b/f96a2b05cf23883ad4e3a82f70780465.jpg"],
    [200, 150, 100], // HP
    [50, 100, 100] // attack damage
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);
  const tx1 = await gameContract.mintCharacter(0);
  await tx1.wait();
  const tx2 = await gameContract.mintCharacter(0);
  await tx2.wait();
  //Get token URI
  const tokenUri1 = await gameContract.tokenURI(1);
  console.log("Token URI: ", tokenUri1);
  const tokenUri2 = await gameContract.tokenURI(2);
  console.log("Token URI: ", tokenUri2);
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