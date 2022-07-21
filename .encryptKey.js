const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encryptJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY
  );
  const encyrpteKey = fs.writeFileSync(".encryptedKey.json", encryptJsonKey);
}

main()
  .then(() => {
    process.exit(1);
  })
  .catch((err) => {
    console.log(err);
  });
