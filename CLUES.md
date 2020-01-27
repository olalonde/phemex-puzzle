# Phemex puzzle clues

A place to collect and compile official clues, proposed solutions and
relevant information in one place. Feel free to contribute.

![phemex puzzle image](./phemex-puzzle.png)

## Official articles

- [Puzzle announcement article](https://phemex.com/references/articles/try-to-solve-our-2-btc-puzzle#the-public-key-is-1h8bnzkhspiu6ekazp19wkgxdw3jhf9at)
  - Possible clue that private key is derived using [bip32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) scheme: "Through this game we want to educate users on the importance of private key custody and safety. We have built our own, innovative **Hierarchical Deterministic** Cold **Wallet** System, which assigns an independent deposit address to each user so that all assets are kept in cold wallets."
  - The Bitcoin address is [1h8BNZkhsPiu6EKazP19WkGxDw3jHf9aT](https://www.blockchain.com/btc/address/1h8BNZkhsPiu6EKazP19WkGxDw3jHf9aT) (note: it is incorrectly referred to as a public key in the article).
- [A letter from Max (27 digit clue)](https://phemex.com/references/articles/a-letter-from-max)
  - "The first 21-digit prime found in consecutive digits of e is: 957496696762772407663
    - Already known
  - "The private key you derive from Satoshi’s portrait is a big integer, not Wallet Import Format (WIF)"
    - Seems self-evident since WIF is just a copy/paste friendly encoding of a private key.
  - "The filename of the picture is irrelevant"
  - "The next step involves converting some words from the portrait, without I/O, into a 27-digit number"
    - 27-digit decimal number is too small to be the output of a hash
      function so we can probalby exclude their use for generating the
      number.
    - I/O possibly refers to [Input/Output](https://en.wikipedia.org/wiki/Input/output) which could be a
      synonym for communication with the outside world (e.g. the puzzle is solvable without
      additional information found on the web).
    - I/O possibly refers to the fact that [base58 encoding](https://en.wikipedia.org/wiki/Base58) excludes the letters `I`, `O`, `1`, and `0`.

## Non-official clues (Twitter / Telegram)

-
