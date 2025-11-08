const CONTRACT_ADDRESS = "0xC559991a7ADeC119Ca37f0Bf3268b8EFd3C431B3";
const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "donor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Donated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdrawn",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "donate",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "donations",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalDonations",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let provider, signer, contract, userAddress;
let pasToPhpRate = 1.47; // Rate: 1 PAS ≈ ₱1.47 (based on $64.03 = 2,491.33 PAS)

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeDisasterSelection();
  initializeEventListeners();
});

function initializeDisasterSelection() {
  const disasterOptions = document.querySelectorAll('.disaster-option');
  disasterOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remove selected class from all options
      disasterOptions.forEach(opt => opt.classList.remove('selected'));
      
      // Add selected class to clicked option
      this.classList.add('selected');
      
      // Set the hidden input value
      document.getElementById('selectedDisaster').value = this.getAttribute('data-id');
      
      // Clear any previous errors
      hideStatus();
    });
  });
}

function initializeEventListeners() {
  document.getElementById("connectButton").addEventListener('click', connectWallet);
  document.getElementById("donateButton").addEventListener('click', donate);
  document.getElementById("refreshButton").addEventListener('click', loadAllData);
  
  // Add input validation for amount field
  document.getElementById("amount").addEventListener('input', function() {
    const amount = parseFloat(this.value);
    if (amount && amount > 0) {
      this.classList.remove('border-red-500');
      this.classList.add('border-green-500');
    } else {
      this.classList.remove('border-green-500');
      this.classList.add('border-red-500');
    }
  });
}

function showStatus(message, type = 'info') {
  const statusEl = document.getElementById('status');
  statusEl.textContent = message;
  statusEl.className = `mt-4 p-4 rounded-lg ${getStatusClass(type)}`;
  statusEl.style.display = 'block';
}

function getStatusClass(type) {
  switch(type) {
    case 'success':
      return 'bg-green-100 text-green-800 border-l-4 border-green-500';
    case 'error':
      return 'bg-red-100 text-red-800 border-l-4 border-red-500';
    case 'info':
    default:
      return 'bg-blue-100 text-blue-800 border-l-4 border-blue-500';
  }
}

function hideStatus() {
  const statusEl = document.getElementById('status');
  statusEl.style.display = 'none';
}

function formatAddress(address) {
  if (!address) return 'Not connected';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function showSpinner(buttonId) {
  const spinner = document.getElementById(buttonId + 'Spinner');
  const text = document.getElementById(buttonId + 'Text');
  if (spinner) spinner.classList.remove('hidden');
  if (text) text.classList.add('opacity-50');
}

function hideSpinner(buttonId) {
  const spinner = document.getElementById(buttonId + 'Spinner');
  const text = document.getElementById(buttonId + 'Text');
  if (spinner) spinner.classList.add('hidden');
  if (text) text.classList.remove('opacity-50');
}

function validateDonationForm() {
  const selectedDisaster = document.getElementById('selectedDisaster').value;
  const selectedRegion = document.getElementById('regionSelect').value;
  const amount = document.getElementById('amount').value;
  
  if (!selectedDisaster) {
    showStatus('⚠️ Please select a disaster type.', 'error');
    return false;
  }
  
  if (!selectedRegion) {
    showStatus('⚠️ Please select a region.', 'error');
    return false;
  }
  
  if (!amount || parseFloat(amount) <= 0) {
    showStatus('⚠️ Please enter a valid donation amount.', 'error');
    return false;
  }
  
  return true;
}

async function connectWallet() {
  if (!window.ethereum) {
    showStatus("⚠️ MetaMask not detected. Please install MetaMask to donate.", "error");
    return;
  }

  try {
    showSpinner('connectButton');
    document.getElementById('connectButton').disabled = true;
    hideStatus();
    
    showStatus("🔗 Connecting to wallet...", "info");
    provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Check if already connected
    const accounts = await provider.listAccounts();
    if (accounts.length === 0) {
      await provider.send("eth_requestAccounts", []);
    }
    
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    document.getElementById("walletAddress").textContent = userAddress;
    document.getElementById("walletInfo").classList.remove('hidden');
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);
    
    if (chainId !== 420420422) {
      showStatus("⚠️ Wrong network! Please switch to Paseo Network (Chain ID: 420420422)", "error");
      document.getElementById('connectButton').disabled = false;
      hideSpinner('connectButton');
      return;
    }

    document.getElementById("donateButton").disabled = false;
    showStatus("✅ Wallet connected! Ready to make a difference.", "success");
    
    await loadAllData();
  } catch (err) {
    console.error("Connection failed:", err);
    showStatus("❌ Error connecting wallet: " + (err.message || "Unknown error"), "error");
  } finally {
    hideSpinner('connectButton');
    document.getElementById('connectButton').disabled = false;
  }
}

async function donate() {
  if (!validateDonationForm()) {
    return;
  }

  const amount = document.getElementById("amount").value;
  const selectedDisaster = document.getElementById('selectedDisaster').value;
  const selectedRegion = document.getElementById('regionSelect').value;

  try {
    showSpinner('donateButton');
    document.getElementById('donateButton').disabled = true;
    hideStatus();
    
    showStatus("📤 Submitting your donation to the blockchain...", "info");
    const tx = await contract.donate({ 
      value: ethers.utils.parseEther(amount) 
    });
    
    showStatus("⏳ Transaction submitted! Waiting for blockchain confirmation...", "info");
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    
    // Store donation metadata in localStorage
    const donationMetadata = {
      donor: userAddress,
      amount: amount,
      disaster: selectedDisaster,
      region: selectedRegion,
      timestamp: Date.now(),
      txHash: receipt.transactionHash
    };
    
    let donations = JSON.parse(localStorage.getItem('reliefChainDonations') || '[]');
    donations.push(donationMetadata);
    localStorage.setItem('reliefChainDonations', JSON.stringify(donations));
    
    showStatus("✅ Thank you! Your donation has been recorded on the blockchain and will help those in need!", "success");
    
    // Reset form
    document.getElementById("amount").value = "";
    document.getElementById("amount").classList.remove('border-green-500', 'border-red-500');
    
    await loadAllData();
  } catch (err) {
    console.error("Donation error:", err);
    
    if (err.code === 4001) {
      showStatus("❌ Transaction was rejected by user.", "error");
    } else if (err.code === -32603) {
      showStatus("❌ Transaction failed. You may not have enough balance.", "error");
    } else {
      showStatus("❌ Transaction failed: " + (err.message || "Unknown error"), "error");
    }
  } finally {
    hideSpinner('donateButton');
    document.getElementById('donateButton').disabled = false;
  }
}

async function getBalance() {
  try {
    if (!contract) return;
    const balance = await contract.getBalance();
    const balanceInPAS = parseFloat(ethers.utils.formatEther(balance));
    document.getElementById("balance").textContent = balanceInPAS.toFixed(4);
    
    // Calculate and display PHP equivalent
    const balanceInPHP = balanceInPAS * pasToPhpRate;
    document.getElementById("balancePHP").textContent = balanceInPHP.toLocaleString('en-PH', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  } catch (err) {
    console.error("Error getting balance:", err);
  }
}

async function getTotalDonations() {
  try {
    if (!contract) return;
    const total = await contract.totalDonations();
    document.getElementById("totalDonations").textContent = parseFloat(ethers.utils.formatEther(total)).toFixed(2);
  } catch (err) {
    console.error("Error getting total donations:", err);
  }
}

async function getUserDonations() {
  try {
    if (!contract || !userAddress) return;
    const userTotal = await contract.donations(userAddress);
    document.getElementById("userDonations").textContent = parseFloat(ethers.utils.formatEther(userTotal)).toFixed(4);
  } catch (err) {
    console.error("Error getting user donations:", err);
  }
}

async function getOwner() {
  try {
    if (!contract) return;
    const owner = await contract.owner();
    document.getElementById("ownerAddress").textContent = owner;
  } catch (err) {
    console.error("Error getting owner:", err);
    document.getElementById("ownerAddress").textContent = "Error loading";
  }
}

async function loadDonationHistory() {
  try {
    if (!contract) return;
    
    const filter = contract.filters.Donated();
    const events = await contract.queryFilter(filter, 0, 'latest');
    
    const historyContainer = document.getElementById("historyContainer");
    document.getElementById("totalTransactions").textContent = events.length;
    
    if (events.length === 0) {
      historyContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <p>No donations recorded yet</p>
        </div>
      `;
      return;
    }

    const recentEvents = events.slice(-30).reverse();
    
    const historyHTML = recentEvents.map(event => {
      const donor = event.args.donor;
      const amount = ethers.utils.formatEther(event.args.amount);
      const block = event.blockNumber;
      
      return `
        <div class="history-item">
          <div>
            <strong>${formatAddress(donor)}</strong> donated
          </div>
          <div class="amount">${parseFloat(amount).toFixed(4)} PAS</div>
          <div class="time">Block #${block}</div>
        </div>
      `;
    }).join('');

    historyContainer.innerHTML = `<div class="history-list">${historyHTML}</div>`;
  } catch (err) {
    console.error("Error loading history:", err);
    const historyContainer = document.getElementById("historyContainer");
    historyContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">❌</div>
        <p>Error loading donation history</p>
      </div>
    `;
  }
}

async function loadLeaderboard() {
  try {
    if (!contract) return;
    
    const filter = contract.filters.Donated();
    const events = await contract.queryFilter(filter, 0, 'latest');
    
    const donorMap = {};
    let totalAmount = 0;
    let totalDonors = 0;
    
    events.forEach(event => {
      const donor = event.args.donor;
      const amount = parseFloat(ethers.utils.formatEther(event.args.amount));
      
      if (donorMap[donor]) {
        donorMap[donor] += amount;
      } else {
        donorMap[donor] = amount;
        totalDonors++;
      }
      totalAmount += amount;
    });

    const leaderboardArray = Object.entries(donorMap)
      .map(([address, amount]) => ({ address, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 15);

    const leaderboardContainer = document.getElementById("leaderboardContainer");
    document.getElementById("totalDonors").textContent = totalDonors;
    
    if (events.length > 0) {
      const avgDonation = totalAmount / events.length;
      document.getElementById("avgDonation").textContent = avgDonation.toFixed(2);
    }
    
    if (leaderboardArray.length === 0) {
      leaderboardContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🎯</div>
          <p>No donations yet. Be the first hero!</p>
        </div>
      `;
      return;
    }

    const medals = ['🥇', '🥈', '🥉'];
    
    const leaderboardHTML = leaderboardArray.map((donor, index) => {
      const rank = index + 1;
      const medal = index < 3 ? medals[index] : `#${rank}`;
      const topClass = index < 3 ? `top${index + 1}` : '';
      
      return `
        <div class="leaderboard-item ${topClass}">
          <div class="rank">${medal}</div>
          <div class="donor-info">
            <div class="donor-address">${formatAddress(donor.address)}</div>
          </div>
          <div class="donor-amount">${donor.amount.toFixed(4)} PAS</div>
        </div>
      `;
    }).join('');

    leaderboardContainer.innerHTML = `<div>${leaderboardHTML}</div>`;
  } catch (err) {
    console.error("Error loading leaderboard:", err);
    const leaderboardContainer = document.getElementById("leaderboardContainer");
    leaderboardContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">❌</div>
        <p>Error loading leaderboard</p>
      </div>
    `;
  }
}

async function loadImpactReports() {
  try {
    const donations = JSON.parse(localStorage.getItem('reliefChainDonations') || '[]');
    const impactContainer = document.getElementById('impactReports');
    
    if (donations.length === 0) {
      impactContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📊</div>
          <p>No impact data yet. Be the first to donate!</p>
        </div>
      `;
      return;
    }
    
    // Group donations by disaster and region
    const impactData = {};
    
    donations.forEach(donation => {
      const key = `${donation.disaster}-${donation.region}`;
      if (!impactData[key]) {
        impactData[key] = {
          disaster: donation.disaster,
          region: donation.region,
          total: 0,
          count: 0
        };
      }
      impactData[key].total += parseFloat(donation.amount);
      impactData[key].count++;
    });
    
    const impactHTML = Object.values(impactData).map(data => `
      <div class="bg-blue-50 p-4 rounded-lg mb-4">
        <div class="flex justify-between items-center">
          <div>
            <h4 class="font-bold text-lg capitalize">${data.disaster} Relief</h4>
            <p class="text-gray-600">${data.region}</p>
          </div>
          <div class="text-right">
            <div class="text-xl font-bold text-green-600">${data.total.toFixed(2)} PAS</div>
            <div class="text-sm text-gray-500">${data.count} donation${data.count > 1 ? 's' : ''}</div>
          </div>
        </div>
      </div>
    `).join('');
    
    impactContainer.innerHTML = impactHTML;
  } catch (err) {
    console.error("Error loading impact reports:", err);
  }
}

async function loadAllData() {
  try {
    showSpinner('refreshButton');
    
    await Promise.all([
      getBalance(),
      getTotalDonations(),
      getUserDonations(),
      getOwner(),
      loadDonationHistory(),
      loadLeaderboard(),
      loadImpactReports()
    ]);
    
  } catch (err) {
    console.error("Error loading data:", err);
    showStatus("❌ Error loading data. Please try again.", "error");
  } finally {
    hideSpinner('refreshButton');
  }
}

// Check if wallet is already connected on page load
window.addEventListener('load', async function() {
  if (window.ethereum) {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        // Auto-connect if wallet is already connected
        signer = provider.getSigner();
        userAddress = accounts[0];
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        
        document.getElementById("walletAddress").textContent = userAddress;
        document.getElementById("walletInfo").classList.remove('hidden');
        document.getElementById("donateButton").disabled = false;
        
        await loadAllData();
        showStatus("✅ Wallet automatically connected!", "success");
      }
    } catch (err) {
      console.error("Auto-connect failed:", err);
    }
  }
});