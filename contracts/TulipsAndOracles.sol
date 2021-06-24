// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.6.0;

// import "./ERC721Tradable.sol";
// // import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.2.0/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// /**
//  * @title TulipsAndOracles
//  */
// contract TulipsAndOracles is ERC721Tradable {
//     string SUNSHINE_URI = "https://ipfs.io/ipfs/QmYUAonnC68ahD9tp8w3ekGnjyALzwaQopUS2nhVt5VbYH?filename=tulips-and-oracles-sunshine.json";
//     string RAINY_URI = "https://ipfs.io/ipfs/QmTKJP6REDXiFce7RybqPBYz6ot133Wged2GDurAe6dPnj?filename=tulips-and-oracles-rain.json";

//     constructor(address _proxyRegistryAddress)
//         public
//         ERC721Tradable("Tulips And Oracles", "DArtCo1", _proxyRegistryAddress)
//     {
//         mintTo(_msgSender());
//     }

//     function getTokenURI() public view returns (string memory) {
//         return tokenURI(1);
//     }

//     function setTokenURI() public {
//         require(
//             _isApprovedOrOwner(_msgSender(), 1),
//             "ERC721: transfer caller is not owner nor approved"
//         );
//         _setTokenURI(1, SUNSHINE_URI);
//     }

//     function setSunshine() public returns (bool) {
//         require(
//             _isApprovedOrOwner(_msgSender(), 1),
//             "ERC721: transfer caller is not owner nor approved"
//         );
//         _setTokenURI(1, SUNSHINE_URI);
//     }

//     function setRainy() public returns (bool) {
//         require(
//             _isApprovedOrOwner(_msgSender(), 1),
//             "ERC721: transfer caller is not owner nor approved"
//         );
//         _setTokenURI(1, RAINY_URI);
//     }
// }