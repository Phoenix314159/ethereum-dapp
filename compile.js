const solc = require('solc');
const path = require('path');
const fs = require('fs-extra');
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const createConfiguration = () => {
    return {
        language: 'Solidity',
        sources: {
            'Inbox.sol': {
                content: fs.readFileSync(inboxPath, 'utf8')
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    }
};
const getImports = dependency => {
    switch (dependency) {
        case 'Inbox.sol':
            return {contents: fs.readFileSync(inboxPath, 'utf8')};
        /*case 'AnotherImportedSolidityFile.sol':
            return {contents: fs.readFileSync(path.resolve(__dirname, 'contracts', 'AnotherImportedSolidityFile.sol'), 'utf8')};*/
        default:
            return {error: 'File not found'}
    }
};
const compileSources = config => {
    return JSON.parse(solc.compile(JSON.stringify(config), getImports));
};
const output = compileSources(createConfiguration());


module.exports = output.contracts;
