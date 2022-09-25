import { Wallet, providers } from "ethers"
import { connect } from "@tableland/sdk"
require("dotenv").config()

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
    console.log(body)
    if (!body.username) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ data: "Username name not found" })
    }
    if (!body.address) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: "Address not found" })
  }

    const wallet = new Wallet(process.env.PRIVATE_KEY)
    const provider = new providers.JsonRpcProvider(process.env.MUMBAI_URL)
    const signer = wallet.connect(provider)
    const tableland = await connect({
        signer,
        network: "testnet",
        chain: "polygon-mumbai"
    })

    //const hashRes = await tableland.hash('CREATE TABLE my_sdk_table_80001 (name text, id int, primary key (id));')
    //const appTableStructure = hashRes.structureHash
    const tables = await tableland.list() // returns an Object with the Tables the connected address owns
    const tableExists = Object.values(tables).filter(table =>
        table.name.startsWith("sobr_users_80001")
    )

    let tableName = ""
    if (!tableExists.length) {
        const { name } = await tableland.create(
            `id integer primary key, username text, addr text`, // Table schema definition
            {
                prefix: `sobr_users` // Optional `prefix` used to define a human-readable string
            }
        )
        tableName = name
    } else {
        tableName = tableExists[0].name
    }

    // Insert a row into the table
    // @return {WriteQueryResult} On-chain transaction hash of the write query
    const writeRes = await tableland.write(
        `INSERT INTO ${tableName} (username, addr) VALUES ('${body.username}', '${body.address}');`
    )
    console.log(writeRes)

    // Found the name.
    // Sends a HTTP success code
    res.status(200).json({ data: `${body.username}` })
}
