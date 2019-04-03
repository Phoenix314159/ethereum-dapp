const solc = require('solc');

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: 'contract Inbox { function f() public { } }'
        },
        'Hello.sol': {
            content: 'contract Hello { function f() public { } }'
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)))

// `output` here contains the JSON output as specified in the documentation
for (let contractName in output.contracts['Inbox.sol']) {
    console.log(contractName + ': ' + output.contracts['Inbox.sol'][contractName].evm.bytecode.object)
}
for (let contractName in output.contracts['Hello.sol']) {
    console.log(contractName + ': ' + output.contracts['Hello.sol'][contractName].evm.bytecode.object)
}