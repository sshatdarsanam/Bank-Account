let myBankArray = [];
const myBanking = require('../../index').banking()
let customersData = []

async function enroll(req, resp) {
    try {
        await myBanking.methods.enroll(req.body.ownerId, req.body.balance).send({
            from: "0xdfE79F998e966DfB9f462d8C0e01cD410B5d4ABE"
        });
        let data = { "ownerId": req.body.ownerId, "balance": req.body.balance }
        customersData.push(data)
        console.log("customersData", customersData)
        resp.send('Successful Enrollment')
    } catch (err) {
        console.log(err)
        resp.status(500).send('Unsuccessful Enrollment')

    }
}
async function deposit(req, resp) {
    try {
        await myBanking.methods.deposit(req.params.ownerId, req.body.balance).send({
            from: "0xdfE79F998e966DfB9f462d8C0e01cD410B5d4ABE"
        });
        console.log(customersData)
        let data = customersData.filter((x) => {
            if (x["ownerId"] == req.params.ownerId) {
                return x
            }
        })
        let amount = data[0]["balance"] + req.body.balance
        data[0]["balance"] = amount
        customersData.push(data[0])
        console.log("customersData", customersData)
        resp.send({ 'Deposit Balance': req.body.balance })

    } catch (err) {
        console.log(err)
        resp.status(500).send('Check the account number')

    }
}
async function withdraw(req, resp) {
    try {
        await myBanking.methods.withdraw(req.params.ownerId, req.body.balance).send({
            from: "0xdfE79F998e966DfB9f462d8C0e01cD410B5d4ABE"
        });
        customersData[req.body.ownerId] -= req.body.balance;

        resp.send({ 'Amount Withdrawn': req.body.balance })

    } catch (err) {
        resp.send(500).send('Insufficient Balance')

    }
}
async function balance(req, resp) {
    try {
        let bal = await myBanking.methods.balance(req.params.ownerId).call({
            from: "0xdfE79F998e966DfB9f462d8C0e01cD410B5d4ABE", gas: '900000', gasPrice: '1'
        });
        resp.send({ "Balance": bal })

    } catch (err) {
        console.log(err)
        resp.status(500).send('No Balance')

    }
}

async function customerCount(req, resp) {
    try {
        let custcount = await myBanking.methods.customerCount().call({
            from: "0xdfE79F998e966DfB9f462d8C0e01cD410B5d4ABE"
        });
        resp.send({ "custcount": custcount })

    } catch (err) {
        console.log(err)
        resp.status(500).send('No Customers')

    }
}

// async function customers(req, resp){
//     try{
//        let customer = await myBanking.methods.customers(req.body.ownerId, req.body.balance).call({
//             from: "0xdfE79F998e966DfB9f462d8C0e01cD410B5d4ABE"
//         });
//         resp.send({"customer": customers})

//     }catch(err){
//         console.log(err)
//         resp.status(500).send('No customers available')

//     }
// }

function customers(req, res) {
    res.send(customersData)
}
module.exports = {
    enroll: enroll,
    deposit: deposit,
    withdraw: withdraw,
    balance: balance,
    customerCount: customerCount,
    customers: customers
}