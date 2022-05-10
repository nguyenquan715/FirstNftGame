const main = async () => {
  // character info
  const characterNames = ["Captain", "Thor", "Iron Man", "Spider Man", "Doctor Strange", "Wanda", "Hulk", "Winter Solider", "Black Widow", "Hawkeye"];
  const characterImages = [
    "https://i.pinimg.com/564x/1e/d0/0d/1ed00d7fcf893cfe305b4903243d9070.jpg",
    "https://i.pinimg.com/564x/b3/03/ec/b303ec6b705423b5de0e160c4e3a0f36.jpg", 
    "https://i.pinimg.com/564x/f9/6a/2b/f96a2b05cf23883ad4e3a82f70780465.jpg",
    "https://i.pinimg.com/564x/2e/cf/15/2ecf1550640e266185961d96439f488c.jpg",
    "https://i.pinimg.com/564x/53/ef/9b/53ef9b5294a9f5a5db55b46a9818fd55.jpg",
    "https://i.pinimg.com/564x/b6/a6/8b/b6a68b80666d97ccf2a2b149b01d3289.jpg",
    "https://i.pinimg.com/564x/3b/90/f1/3b90f1f9906ee32231a42b5e458f99d6.jpg",
    "https://i.pinimg.com/564x/75/b4/b1/75b4b16cca9e9ca8945df7b35b159fbd.jpg",
    "https://i.pinimg.com/564x/db/26/be/db26bed4a2527c9867db86f6246d3f33.jpg",
    "https://i.pinimg.com/564x/79/1e/fb/791efb4e6d04d5454204cae4ae96c756.jpg"
  ];
  const characterHps = [200, 150, 100, 100, 100, 75, 150, 75, 75, 75];
  const characterDamages = [50, 125, 100, 75, 125, 150, 150, 50, 50, 75];
  // boss info
  const bossName = "Thanos";
  const bossImage = "https://i.pinimg.com/564x/9e/27/ba/9e27ba0ebcfc9031afa945eda4eaf719.jpg";
  const bossHp = 10000;
  const bossDamage = 50;

  // deployment
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  const [owner, ...otherUsers] = await hre.ethers.getSigners();
  const gameContract = await gameContractFactory.deploy(
    characterNames,
    characterImages,
    characterHps,
    characterDamages,
    bossName,
    bossImage,
    bossHp,
    bossDamage
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);
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
//0x4e0e2557394f503E3B9f7A0e84D2B6F55833C5c6