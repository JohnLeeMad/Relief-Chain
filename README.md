# Relief Chain - Blockchain-Based Disaster Relief Platform

## 📋 Project Overview

Relief Chain is a transparent, blockchain-powered disaster relief donation platform developed during the Blockchain Research and Development Bootcamp Training organized by Nueva Ecija University of Science and Technology (NEUST) in collaboration with DVCode Technologies, OpenGuild, and Polkadot.

This decentralized application (dApp) enables donors to contribute to disaster relief efforts with complete transparency, leveraging blockchain technology to ensure every donation is publicly verifiable and traceable.

## 🎯 Problem Statement

Traditional disaster relief donation systems often suffer from:
- Lack of transparency in fund allocation
- High administrative fees reducing actual aid
- Difficulty tracking donation impact
- Limited donor confidence due to opacity

Relief Chain addresses these challenges by providing a fully transparent, blockchain-based solution where every transaction is permanently recorded and publicly verifiable.

## ✨ Key Features

### 🔐 *Blockchain Transparency*
- All donations permanently recorded on the Paseo blockchain
- Public verification of every transaction
- Zero administrative fees - 100% of donations reach relief efforts
- Immutable audit trail via smart contracts

### 🎯 *Targeted Giving*
Choose specific disaster types and regions:
- 🌪️ Typhoon Relief
- 🏔️ Earthquake Response
- 🌊 Flood Recovery
- 🔥 Fire Disaster Aid
- 🌋 Volcanic Eruption Relief
- 🤝 General Relief Fund

Support across 17 Philippine regions including NCR, CAR, CALABARZON, and more.

### 📊 *Real-Time Impact Tracking*
- Live donation feed showing recent contributions
- Impact reports by disaster type and region
- Hall of Heroes leaderboard recognizing top contributors
- Comprehensive statistics dashboard

### 🔍 *Full Verifiability*
- Direct link to Paseo blockchain explorer
- Smart contract verification
- Public viewing of all transactions
- Authorized withdrawal restrictions

## 🛠️ Technology Stack

### *Blockchain*
- *Network*: Paseo Testnet (Chain ID: 420420422)
- *Smart Contract*: Solidity-based donation contract
- *Web3 Library*: Ethers.js v5.7.2
- *Wallet Integration*: MetaMask

### *Frontend*
- *HTML5* - Semantic markup
- *Tailwind CSS* - Utility-first styling
- *Vanilla JavaScript* - Interactive functionality
- *Responsive Design* - Mobile-friendly interface

### *Smart Contract Features*
// Core Functions
- donate() - Accept ETH donations (payable)
- withdraw() - Owner-only fund withdrawal
- getBalance() - View current contract balance
- donations(address) - Track individual contributions
- totalDonations() - View cumulative donations

## 📦 Installation & Setup

### Prerequisites
- MetaMask browser extension
- Connection to Paseo Testnet
- Test PAS tokens for donations

### Local Development

1. *Clone the repository*
git clone https://github.com/JohnLeeMad/Relief-Chain.git
cd relief-chain

2. *Open the project*
# Simply open donate.html in your browser
# No build process required - pure HTML/CSS/JS

3. *Configure MetaMask*
- Add Paseo Network to MetaMask:
  - Network Name: Paseo Testnet
  - RPC URL: https://rpc.paseo.io
  - Chain ID: 420420422
  - Currency Symbol: PAS
  - Block Explorer: https://paseo.subscan.io

4. *Get Test Tokens*
- Visit Paseo faucet to receive test PAS tokens
- Use for testing donations on the platform

## 🚀 Usage Guide

### For Donors

1. *Connect Wallet*
   - Click "Connect Wallet to Donate"
   - Approve MetaMask connection
   - Ensure you're on Paseo Network

2. *Select Your Cause*
   - Choose disaster type (Typhoon, Earthquake, etc.)
   - Select affected region in the Philippines

3. *Make Your Donation*
   - Enter amount in PAS
   - Or use quick-select buttons (5, 10, 25 PAS)
   - Click "Donate Now"
   - Confirm transaction in MetaMask

4. *Track Your Impact*
   - View your total contributions
   - See real-time donation feed
   - Check impact reports by region
   - Monitor leaderboard standings

### For Relief Coordinators

- Designated wallet address can withdraw funds
- All withdrawals recorded on blockchain
- Transparent fund distribution tracking

## 📱 Smart Contract Details

*Contract Address*: 0xC559991a7ADeC119Ca37f0Bf3268b8EFd3C431B3

*Network*: Paseo Testnet

*Verified Features*:
- ✅ Immutable donation records
- ✅ Public balance transparency  
- ✅ Authorized withdrawal only
- ✅ Event-based audit trail
- ✅ Zero administrative fees

*View on Explorer*: [Paseo Subscan](https://paseo.subscan.io/account/0xC559991a7ADeC119Ca37f0Bf3268b8EFd3C431B3)

## 🎓 Educational Context

This project was developed as part of the *Blockchain Research and Development Bootcamp Training* - a collaborative educational initiative between:

- *Nueva Ecija University of Science and Technology (NEUST)* - Host institution providing students with cutting-edge blockchain education
- *DVCode Technologies* - Technology partner providing blockchain expertise
- *OpenGuild* - Open-source blockchain development community
- *Polkadot* - Next-generation blockchain protocol enabling the platform

The workshop aimed to:
- Introduce students to blockchain development
- Provide hands-on experience with smart contracts
- Demonstrate real-world blockchain applications
- Foster innovation in disaster relief technology

## 🌟 Inspiration

Relief Chain draws inspiration from *BitGive Foundation's* pioneering work in transparent charitable giving through blockchain technology. By making every donation traceable and verifiable, we aim to increase donor confidence and ensure maximum impact for disaster-affected communities.

## 📊 Platform Statistics

The dashboard displays:
- *Current Balance* - Total funds available for deployment
- *Total Raised* - Cumulative donations in PAS
- *Total Donors* - Unique contributors
- *Average Donation* - Mean contribution amount
- *Total Transactions* - Number of donation events

## 🔒 Security Features

- MetaMask wallet integration for secure transactions
- Smart contract restricts withdrawals to authorized address
- All transactions require user approval
- Public blockchain verification
- No private key handling by the application

## 🗺️ Roadmap

Future enhancements planned:
- [ ] Detailed fund allocation reports
- [ ] Integration with traditional payment gateways

## 🤝 Contributing

We welcome contributions from the blockchain community! To contribute:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Developed by NEUST students as part of the Blockchain R&D Bootcamp Training.

## 🙏 Acknowledgments

- *NEUST* - For providing the educational opportunity
- *DVCode Technologies* - For technical guidance and blockchain expertise
- *OpenGuild* - For open-source blockchain development support
- *Polkadot* - For the blockchain infrastructure and ecosystem
- *BitGive Foundation* - For inspiration in transparent charitable giving
- *MetaMask* - For secure wallet integration
- All workshop facilitators and mentors

## 📞 Support

For questions or support:
- Email: [jonleemad17@gmail.com] [johnpaulopadolinasamson@gmail.com]
- GitHub Issues: [Create an issue](https://github.com/JohnLeeMad/Relief-Chain/issues/1)

## 🌐 Links

- [Paseo Explorer](https://paseo.subscan.io/)
- [Smart Contract](https://paseo.subscan.io/account/0xC559991a7ADeC119Ca37f0Bf3268b8EFd3C431B3)
- [Polkadot](https://polkadot.network/)
- [DVCode Technologies](https://dvcode.tech)

---

*Built with ❤️ for disaster relief transparency*

Making every donation count through blockchain technology
