// Prints all loremflickr URLs used by products.ts
const KEYWORDS = {
  faucet:   "faucet,chrome,bathroom",
  shower:   "shower,head,bathroom",
  basin:    "bathroom+sink,white",
  toilet:   "toilet,bathroom,ceramic",
  bath:     "bathtub,bathroom,white",
  towel:    "towel+rail,bathroom",
  acc:      "bathroom+accessory,chrome",
};

const img = (n) => {
  const prefix = n.split("-")[0];
  const kw = KEYWORDS[prefix] ?? "bathroom";
  const lock = n.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return `https://loremflickr.com/600/600/${kw}?lock=${lock}`;
};

const files = `acc-1b.jpg acc-1.jpg acc-2.jpg acc-3b.jpg acc-3.jpg acc-4.jpg acc-5.jpg acc-6b.jpg acc-6.jpg acc-7b.jpg acc-7.jpg acc-8b.jpg acc-8.jpg acc-9.jpg basin-1b.jpg basin-1.jpg basin-2b.jpg basin-2.jpg basin-3b.jpg basin-3c.jpg basin-3.jpg basin-4b.jpg basin-4.jpg basin-5b.jpg basin-5.jpg basin-6.jpg basin-7b.jpg basin-7.jpg basin-8b.jpg basin-8c.jpg basin-8.jpg bath-1b.jpg bath-1.jpg bath-2b.jpg bath-2c.jpg bath-2.jpg bath-3b.jpg bath-3.jpg bath-4b.jpg bath-4.jpg bath-5b.jpg bath-5.jpg bath-6b.jpg bath-6.jpg faucet-1b.jpg faucet-1c.jpg faucet-1.jpg faucet-2b.jpg faucet-2.jpg faucet-3b.jpg faucet-3.jpg faucet-4b.jpg faucet-4.jpg faucet-5b.jpg faucet-5.jpg faucet-6b.jpg faucet-6.jpg faucet-7b.jpg faucet-7.jpg faucet-8b.jpg faucet-8.jpg faucet-9b.jpg faucet-9.jpg shower-1b.jpg shower-1c.jpg shower-1.jpg shower-2b.jpg shower-2.jpg shower-3b.jpg shower-3.jpg shower-4b.jpg shower-4c.jpg shower-4.jpg shower-5b.jpg shower-5.jpg shower-6b.jpg shower-6.jpg shower-7b.jpg shower-7.jpg shower-8b.jpg shower-8.jpg toilet-1b.jpg toilet-1c.jpg toilet-1.jpg toilet-2b.jpg toilet-2.jpg toilet-3b.jpg toilet-3.jpg toilet-4b.jpg toilet-4.jpg toilet-5.jpg towel-1b.jpg towel-1.jpg towel-2b.jpg towel-2.jpg towel-3b.jpg towel-3.jpg towel-4.jpg towel-5b.jpg towel-5.jpg`.trim().split(" ");

files.forEach(f => console.log(`${f}  ->  ${img(f)}`));
