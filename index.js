const fs = require('fs');
const bitcoin = require('bitcoinjs-lib');

const puzzleAddresses = fs.readFileSync('puzzle.txt', 'utf-8').split('\n').filter(Boolean);
const cores = 6; // Number of CPU cores

function generateRandomKey() {
  const keyPair = bitcoin.ECPair.makeRandom();
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  return { keyPair, address };
}

function seek() {
  while (true) {
    const { keyPair, address } = generateRandomKey();

    if (puzzleAddresses.includes(address)) {
      console.log('Nice One Found!', keyPair.toWIF(), address);
      const data = `${keyPair.toWIF()}:${address}\n`;
      fs.appendFileSync('CompressedWinner.txt', data);
    } else {
      console.log(address);
    }
  }
}

function startProgram() {
  console.log('Start Program');
  console.log('Loading Puzzle TXT. Please wait and good luck...');

  for (let i = 0; i < cores; i++) {
    seek();
  }
}

function endProgram() {
  console.log('End Program');
}

// Register exit handler
process.on('exit', endProgram);

// Start the program
startProgram();
