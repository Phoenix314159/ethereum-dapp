const assert = require('assert');
const ganache = require('ganache-cli');
const provider = ganache.provider();
const Web3 = require('web3');
const web3 = new Web3(provider);
const {['Inbox.sol']: {Inbox : {abi, evm: {bytecode: {object}}}}} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(abi)
        .deploy({data: object, arguments: ['99999']})
        .send({from: accounts[0], gas: '1000000'});
    inbox.setProvider(provider);

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(inbox)

    })
});
