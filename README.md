# Aptos Winter School Coding Challenge Solution

## Overview

This project is a simple full-stack game built on Aptos, including a frontend and a smart contract. The game involves a button that users can click to increment a global counter stored on the blockchain. Users need to connect their wallets using the Wallet Adapter before participating.

### Features

- **Connect Wallet:** Users can link their wallets using the Wallet Adapter.
- **Global Counter:** Displays the total number of clicks globally, pulled from the on-chain smart contract. The counter updates every few seconds.
- **Click Button:** Users can click a large circle button, which prompts them to sign and submit a transaction to increment the on-chain counter.
- **Bonus Feature: Leaderboard:** A leaderboard showcasing the top 10 users with the most clicks.

## General Flow

1. **Connect Wallet:** Users connect their wallets.
2. **Global Counter:** The number on the page updates to show the total clicks globally.
3. **Click Button:** Users can click the button to increment the on-chain counter.

## Bonus Features

- **Leaderboard:** Displays the top 10 users with the most clicks.


## Setup Instructions

To run the project locally, follow these steps:

1. Clone the repository:
2. cd your-repository
3. npm install
4. npm start

Open your web browser and go to http://localhost:3000 to view the app.

Technologies Used

    Frontend: React,
    Wallet Integration: Petra Wallet
    Smart Contract: Move Language (Deployed on the Aptos Blockchain)
