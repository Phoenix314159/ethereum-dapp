const assert = require('assert');
const ganache = require('ganache-cli');
const provider = ganache.provider();
const Web3 = require('web3');
const web3 = new Web3(provider);
const initialMessage = '99initialMessage99';
const gas = '1000000';
const {['Inbox.sol']: {Inbox : {abi, evm: {bytecode: {object}}}}} = require('../compile');
require('events').EventEmitter.defaultMaxListeners = Infinity;

let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(abi)
        .deploy({data: object, arguments: [initialMessage]})
        .send({from: accounts[0], gas });
    inbox.setProvider(provider);

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, initialMessage)
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('changedMessage').send({ from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'changedMessage');
    });
});
