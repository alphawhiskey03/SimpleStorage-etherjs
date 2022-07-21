const ethers = require('ethers')
const fs = require('fs-extra')
require('dotenv').config()
async function main() {
    //Provide the RCP url of the blocchain node
    console.log('Hello, world!')
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)

    // connecting to the wallet with the private key
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    // getting the abi
    const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8')

    // getting binary
    const binary = fs.readFileSync(
        './SimpleStorage_sol_SimpleStorage.bin',
        'utf8'
    )

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log('Deploying the contract...')
    const contract = await contractFactory.deploy()

    // Here with the below line we wait for 1 block confirmation
    await contract.deployTransaction.wait(1)
    console.log(contract.address)
    const currentFavoriteNumber = await contract.retreive()
    console.log(`current favorite number : ${currentFavoriteNumber.toString()}`)

    const transactionResponse = await contract.store('10')
    const transactionRecipt = await transactionResponse.wait(1)

    const updatedFavoriteNumber = await contract.retreive()
    console.log(`current favorite number : ${updatedFavoriteNumber.toString()}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
    })
