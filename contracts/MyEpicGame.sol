// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

import "./libraries/Base64.sol";

contract MyEpicGame is ERC721 {
  struct Character {
    uint32 index;
    string name;
    string imageURI;
    uint32 hp;
    uint32 maxHp;
    uint32 attackDamage;
  }

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  Character[] defaultCharacters;

  mapping(uint256 => Character) public nftAttributes;
  mapping(address => uint256) public nftHolders;

  struct BigBoss {
    string name;
    string imageURI;
    uint32 hp;
    uint32 maxHp;
    uint32 attackDamage;
  }

  BigBoss public bigBoss;

  constructor(
    string[] memory characterNames,
    string[] memory characterImageURIs,
    uint32[] memory characterHp,
    uint32[] memory characterAttackDmg,
    string memory bossName,
    string memory bossImageURI,
    uint32 bossHp,
    uint32 bossAttackDamage
  ) ERC721("Heroes", "HERO") {
    bigBoss = BigBoss({
      name: bossName,
      imageURI: bossImageURI,
      hp: bossHp,
      maxHp: bossHp,
      attackDamage: bossAttackDamage
    });
    console.log("Done initializing boss %s with HP: %s and IMG: %s", bigBoss.name, bigBoss.hp, bigBoss.imageURI);

    for (uint32 i = 0; i< characterNames.length; i++) {
      defaultCharacters.push(Character({
        index: i,
        name: characterNames[i],
        imageURI: characterImageURIs[i],
        hp: characterHp[i],
        maxHp: characterHp[i],
        attackDamage: characterAttackDmg[i]
      }));

      Character memory c = defaultCharacters[i];
      console.log("Done initializing hero %s with HP: %s and IMG: %s", c.name, c.hp, c.imageURI);
    }

    _tokenIds.increment();
  }

  function mintCharacter(uint32 _characterIndex) external {
    uint256 newItemId = _tokenIds.current();
    _safeMint(msg.sender, newItemId);
    Character memory characterClone = defaultCharacters[_characterIndex];
    nftAttributes[newItemId] = characterClone;
    nftHolders[msg.sender] = newItemId;
    _tokenIds.increment();
    console.log("Minted NFT with tokenId %s and characterIndex %s", newItemId, _characterIndex);
  }

  function tokenURI(uint256 _tokenId) public view override returns(string memory) {
    Character memory characterClone = nftAttributes[_tokenId];

    string memory strHp = Strings.toString(characterClone.hp);
    string memory strMaxHp = Strings.toString(characterClone.maxHp);
    string memory strAttackDamage = Strings.toString(characterClone.attackDamage);

    string memory json = Base64.encode(
      abi.encodePacked(
        '{"name": "',
        characterClone.name,
        ' #',
        Strings.toString(_tokenId),
        '", "description": "This is an NFT that lets people play in the game Metaverse Slayer!", "image": "',
        characterClone.imageURI,
        '", "attributes": [ { "trait_type": "Health Points", "value": ',strHp,', "max_value":',strMaxHp,'}, { "trait_type": "Attack Damage", "value": ',
        strAttackDamage,'} ]}'
      )
    );
    string memory output = string(
      abi.encodePacked("data:application/json;base64,", json)
    );

    return output;
  }
}