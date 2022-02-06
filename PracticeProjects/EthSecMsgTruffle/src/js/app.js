App = {
    web3Provider: null,
    contracts: {},

    init: async function() {
        // Load message.
        $.getJSON('../message.json', function(data) {
            var messageRow = $('#messageRow');
            var messageTemplate = $('#messageTemplate');

            for (i = 0; i < data.length; i++) {
                messageTemplate.find('.userInput').text(data[i].message);
                messageTemplate.find('.btn-buy').attr('data-id', data[i].id);

                messageRow.append(messageTemplate.html());
            }
        });

        return await App.initWeb3();
    },

    initWeb3: async function() {
        // Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                // User denied account access...
                console.error('User denied account access');
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider(
                'http://localhost:7545'
            );
        }
        web3 = new Web3(App.web3Provider);
        // Set abi
        let abi = [{
                constant: false,
                inputs: [{
                    name: 'x',
                    type: 'string',
                }, ],
                name: 'setMessage',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'getMessage',
                outputs: [{
                    name: '',
                    type: 'string',
                }, ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
        ];
        // Get the contract address
        let RemixContract = web3.eth.contract(abi, '');

        $('.btn-buy').click(() => {
            let message = $('#userInput').val();
            RemixContract.methods
                .setMessage(message)
                .send({
                    from: defAccount,
                })
                .then(result => {
                    console.log('send message:', message);
                    console.log(result);
                })
                .catch(error => {
                    console.log(error);
                });
        });

        return App.initContract();
    },

    initContract: function() {
        $.getJSON('Message.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with @truffle/contract
            var MessageArtifact = data;
            App.contracts.Message = TruffleContract(MessageArtifact);

            // Set the provider for our contract
            App.contracts.Message.setProvider(App.web3Provider);

            // Use our contract to retrieve and set messge
            return App.runMessage();
        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', '.btn-buy', App.handleMessage);
    },

    runMessage: function() {
        var messageInstance;

        App.contracts.Message.deployed()
            .then(function(instance) {
                messageInstance = instance;

                return messageInstance.getMessage.call();
            })
            .then(function(message) {
                for (i = 0; i < message.length; i++) {
                    if (message[i] !== '0x0000000000000000000000000000000000000000') {
                        $('.panel-message')
                            .eq(i)
                            .find('button')
                            .text('Success')
                            .attr('disabled', true);
                    }
                }
            })
            .catch(function(err) {
                console.log(err.message);
            });
    },

    handleMessage: function(event) {
        event.preventDefault();

        var messageId = parseInt($(event.target).data('id'));

        var adoptionInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            }

            var account = accounts[0];

            App.contracts.Message.deployed()
                .then(function(instance) {
                    messageInstance = instance;

                    // Execute adopt as a transaction by sending account
                    return messageInstance.mess(messageId, { from: account });
                })
                .then(function(result) {
                    return App.runMessage();
                })
                .catch(function(err) {
                    console.log(err.message);
                });
        });
    },
};

$(function() {
    $(window).load(function() {
        App.init();
    });
});