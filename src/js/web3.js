/* DOM Elements */
const containerEl = document.querySelector('#container');
const loaderEl = document.querySelector('#loader');

const networkLinkEl = document.querySelector('#networkLink');
const networkNameEl = document.querySelector('#networkName');

const imageIframeEl = document.querySelector('#nftImage');
const cityInputEl = document.querySelector('#cityInput');
const cityBtnEl = document.querySelector('#cityBtn');
const updateFormEl = document.querySelector('#updateForm');

/* VARIABLES */
var CONTRACT_ADDRESS = '';
// var CONTRACT_ABI = [];
let web3;
let networkId;
let account;
let contract;
let owner;
let approvedAddress;
let jsonUrl;
let gifUrl;
let isSunny;
let cityInput;
let mainWeather;

window.addEventListener('load', async () => {
  loader = true;
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    networkId = await web3.eth.net.getId();
    // console.log(networkId);
    await getContractJson(networkId);
    // console.log(CONTRACT_ABI_LOCAL);
    // console.log(CONTRACT_ADDRESS_LOCAL);
    try {
      // console.log('ethereum');
      let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      account = Web3.utils.toChecksumAddress(accounts[0]);
      contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      await fetchContractData();
      loader = false;
      await handleMetamaskTaskChanges();
    } catch (e) {
      console.log(e);
      loader = false;
    }
  } else if (window.web3) {
    // console.log('web3');
    web3 = new Web3(web3.currentProvider);
    networkId = await web3.eth.net.getId();
    // console.log(networkId);
    await getContractJson(networkId);
    let accounts = await web3.eth.getAccounts();
    account = Web3.utils.toChecksumAddress(accounts[0]);
    contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    await fetchContractData();
    loader = false;
    await handleMetamaskTaskChanges();
  } else {
    loader = false;
    Swal.fire({
      imageUrl: 'https://docs.metamask.io/metamask-fox.svg',
      imageAlt: 'Metamask logo',
      text:
        'Welcome, connect Metamask wallet on mobile by returning to www.stakewise.org through browser in the Metamask mobile app to confirm your stakes.',
      footer:
        '<a href="https://metamask.io/download.html">You should consider trying MetaMask!</a>',
    });
    console.log(
      'Non-Ethereum browser detected. You should consider trying MetaMask!'
    );
  }
  loader = false;
});

/* FUNCTIONS */
async function fetchContractData() {
  try {
    // console.log('jsonUrl');
    // console.log(contract);
    let res = await contract.methods.getTokenURI().call();
    // console.log(res);
    res = await fetch(res);
    // console.log(res);
    jsonUrl = await res.json();
    // console.log(jsonUrl);
    gifUrl = jsonUrl.gif;
    // console.log(gifUrl);
    if (gifUrl.search(/sunshine/i) != -1) {
      isSunny = true;
    } else {
      isSunny = false;
    }
    imageIframeEl.src = gifUrl;

    /* NETWORK NAME AND LINK */
    console.log(networkId);
    if (networkId === 5777) {
      // local
      networkLinkEl.href = '#';
      networkNameEl.innerText = 'Local';
    } else if (networkId === 80001) {
      // matic mumbai
      networkLinkEl.href =
        'https://explorer-mumbai.maticvigil.com/address/0xB2D25CFBc2CE54f24C37461586425D3591d9632C';
      networkNameEl.innerText = 'Matic Testnet';
    } else if (networkId === 4) {
      // rinkeby
      networkLinkEl.href =
        'https://rinkeby.etherscan.io/address/0x975b2B160ec9a9cD2beC4b73936E13Cf38Bdf1c2';
      networkNameEl.innerText = 'Rinkeby Testnet';
    } else if (networkId === 5) {
      // goerli
      networkLinkEl.href =
        'https://goerli.etherscan.io/address/0x3013D9D59ddFd198017210B264c7aBDF20b7EAaE';
      networkNameEl.innerText = 'Goerli Testnet';
    } else {
      networkLinkEl.href = '#';
      networkNameEl.innerText = 'Unknown';
    }

    /* INPUT HIDE/SHOW */

    // console.log('account >>> ', account);
    owner = await contract.methods.owner().call();
    // console.log('owner >>> ', owner);
    approvedAddress = await contract.methods.getApproved('1').call();
    // console.log('approvedAddress >>> ', approvedAddress);

    if (
      String(account) == String(owner) ||
      String(account) == String(approvedAddress)
    ) {
      // console.log('owner or approvedAddress');
      // updateFormEl.style.visibility = 'visible';
      updateFormEl.style.display = 'block';
    } else {
      // console.log('other user');
      // updateFormEl.style.visibility = 'hidden';
      updateFormEl.style.display = 'none';
    }
  } catch (error) {
    imageIframeEl.src = `./assets/images/loader.gif`;
  }
}

async function handleMetamaskTaskChanges() {
  window.ethereum.on('accountsChanged', function (accounts) {
    location.reload();
  });
  window.ethereum.on('chainChanged', function (networkId) {
    location.reload();
  });
}

cityBtnEl.addEventListener('click', async () => {
  cityInput = cityInputEl.value.toLowerCase();
  // console.log(cityInput);
  try {
    loader = true;
    let res = (
      await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=f2f23c6cc7c9adc4816542888a3984bc`
      )
    ).data;
    mainWeather = res.weather[0].main;
    // console.log(mainWeather);

    if (mainWeather === 'Rain') {
      // check if its already rainy src set then give alert
      if (isSunny) {
        const receipt = await contract.methods
          .setRainy()
          .send({ from: account });
        // console.log(receipt);
        if (receipt.status) {
          window.location.reload();
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Weather is Rainy not Sunny',
        });
      }
    } else {
      // check if its already sunny src set then give alert
      if (!isSunny) {
        const receipt = await contract.methods
          .setSunshine()
          .send({ from: account });
        console.log(receipt);
        if (receipt.status) {
          window.location.reload();
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Weather is Sunny not Rainy',
        });
      }
    }
    cityInputEl.value = '';
    loader = false;
  } catch (error) {
    loader = false;
    console.log(error);
    cityInputEl.value = '';
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${error.message}`,
    });
  }
});

/* DISPLAY LOADER */
loaderInterval = setInterval(async () => {
  if (loader) {
    containerEl.style.visibility = 'hidden';
    loaderEl.style.display = 'block';
    window.scrollTo(0, 0);
  } else {
    loaderEl.style.display = 'none';
    containerEl.style.visibility = 'visible';
  }
}, 1000);
