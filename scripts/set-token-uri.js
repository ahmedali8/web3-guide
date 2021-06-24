const TulipsAndOracles = artifacts.require('TulipsAndOracles');
const TOKEN_ID = 1;

module.exports = async (callback) => {
  // const tulipsAndOracles = await TulipsAndOracles.deployed();
  const tulipsAndOracles = await TulipsAndOracles.at(
    '0xc74a6EB0F681D9aE006914E4cDE289F094c50EB8'
  );

  console.log("Let's set the tokenURI of your NFT");

  // Sunshine
  const tx = await tulipsAndOracles.setSunshine();

  // Rain
  // const tx = await tulipsAndOracles.setRainy();

  // const tx = await tulipsAndOracles.setTokenURI(
  //   TOKEN_ID,
  //   'https://ipfs.io/ipfs/QmYUAonnC68ahD9tp8w3ekGnjyALzwaQopUS2nhVt5VbYH?filename=tulips-and-oracles-sunshine.json'
  // );

  // Rain
  // const tx = await tulipsAndOracles.setTokenURI(
  //   TOKEN_ID,
  //   'https://ipfs.io/ipfs/QmaDRrexP3henL13U76b5D7R9NhKqaT4oYju7Gmg564xG5?filename=tulips-and-oracles-sunshine.json'
  // );

  console.log(tx);

  callback(tx.tx);
};
