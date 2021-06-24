const getContractJson = async (networkId) => {
  try {
    if (networkId === 5777) {
      // local
      CONTRACT_ADDRESS = '0xbE3D9E89a0141D0D8BEc439e5cd02F1Db2B7B253';
      // await fetchContract(networkId);
    } else if (networkId === 80001) {
      // matic mumbai
      CONTRACT_ADDRESS = '0xB2D25CFBc2CE54f24C37461586425D3591d9632C';
      // await fetchContract(networkId);
    } else if (networkId === 4) {
      // rinkeby
      CONTRACT_ADDRESS = '0x975b2B160ec9a9cD2beC4b73936E13Cf38Bdf1c2';
      // await fetchContract(networkId);
    } else if (networkId === 5) {
      // goerli
      CONTRACT_ADDRESS = '0x3013D9D59ddFd198017210B264c7aBDF20b7EAaE';
      // await fetchContract(networkId);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid network',
        text: 'Please connect to Matic/Goerli/Rinkeby Testnet',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// async function fetchContract(networkId) {
//   let jsonData = (await axios.get('./contracts/TulipsAndOraclesNFT.json')).data;
// console.log(jsonData);
//   CONTRACT_ABI = jsonData.abi;
//   CONTRACT_ADDRESS = jsonData.networks[networkId].address;
// }
