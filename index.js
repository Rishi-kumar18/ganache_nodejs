const Web3 = require('web3');

// Connect to Ganache
const ganacheURL = 'http://127.0.0.1:7545';
const web3 = new Web3(ganacheURL); // Updated syntax for modern web3 versions

const main = async () => {
  try {
    // Verify connection and chain ID
    const chainId = await web3.eth.net.getId();
    if (chainId === 5777) {
      console.log('Connected to Ganache with Chain ID 5777');
    } else {
      console.log('Connected to a different network:', chainId);
      return;
    }

    // Retrieve available accounts
    const accounts = await web3.eth.getAccounts();
    console.log('Available accounts:', accounts);

    // Show balance of the first account
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log(`Balance of ${accounts[0]}: ${web3.utils.fromWei(balance, 'ether')} ETH`);

    // Send a transaction: Transfer Ether between two accounts
    if (accounts.length > 1) {
      console.log('Transferring 1 ETH from the first account to the second account...');
      const txReceipt = await web3.eth.sendTransaction({
        from: accounts[0],
        to: accounts[1],
        value: web3.utils.toWei('1', 'ether'),
        gas: 21000,
      });

      console.log('Transaction successful!', txReceipt);
    } else {
      console.log('Not enough accounts to test transactions.');
    }

    // Interact with smart contracts (example placeholder)
    const contractABI = []; // Replace with your contract's ABI
    const contractAddress = '0xYourContractAddress'; // Replace with your contract's address

    if (contractABI.length && contractAddress !== '0xYourContractAddress') {
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      // Example: Call a read-only function
      const result = await contract.methods.yourReadFunction().call();
      console.log('Contract read function result:', result);

      // Example: Execute a state-changing function
      const receipt = await contract.methods.yourWriteFunction().send({
        from: accounts[0],
        gas: 150000,
      });
      console.log('Contract write function receipt:', receipt);
    } else {
      console.log('No smart contract interaction configured.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// Execute the main functio
main();
