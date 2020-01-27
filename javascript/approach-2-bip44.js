const { countDigits, b58decode, prime21 } = require("./utils");
const { verify27Num } = require("./verify");

// const words = ["XRP", "ETH", "BTC", "Phemex"];

// https://github.com/bitcoinjs/bip44-constants/blob/master/index.js

{
  const XRP = 0x80000090n;
  const ETH = 0x8000003cn;
  const BTC = 0x80000000n;
  const Phemex = b58decode("Phemex");
  console.log(countDigits(XRP)); // 10 digits
  console.log(countDigits(XRP * ETH * BTC)); // 28 digits
  console.log(countDigits(0x800000908000003c80000000n)); // 29 digits
  console.log(countDigits(0x800000908000003c80000000n / 21n)); // 28 digits

  console.log(countDigits((XRP * ETH * BTC) / 21n)); // 27 digits
  verify27Num((XRP * ETH * BTC) / 21n);

  console.log(countDigits(XRP * ETH * BTC - Phemex)); // 28 digits
  console.log(countDigits((XRP ^ ETH ^ BTC) * Phemex)); // 20 digits
}

/*
{
  const XRP = 0x80000090n;
  const ETH = 0x8000003cn;
  const BTC = 0x80000000n;
  const Phemex = b58decode("Phemex") % prime21;
  verify27Num((XRP * ETH * BTC) / 21n);
}

{
  const XRP = 0x80000090n % prime21;
  const ETH = 0x8000003cn % prime21;
  const BTC = 0x80000000n % prime21;
  const Phemex = b58decode("Phemex");
  console.log(countDigits(XRP));
  console.log(countDigits(XRP * ETH * BTC));
  console.log(countDigits(0x800000908000003c80000000n));
  console.log(countDigits(0x800000908000003c80000000n / 21n));

  console.log(countDigits((XRP * ETH * BTC) / 21n));
  verify27Num((XRP * ETH * BTC) / 21n);

  console.log(countDigits(XRP * ETH * BTC - Phemex));
  console.log(countDigits((XRP ^ ETH ^ BTC) * Phemex));
}
*/
