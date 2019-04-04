const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');;
const {['Inbox.sol']: {Inbox : {abi, evm: {bytecode: {object}}}}} = require('../compile');

let accounts;
let inbox;

beforeEach(async done => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(abi)
        .deploy({data: object, arguments: ['Hi There!']})
        .send({from: accounts[0], gas: '1000000'})
    done()
});

describe('Inbox', () => {
    it('deploys a contract', done => {
        console.log(inbox)
        done()
    })
});
