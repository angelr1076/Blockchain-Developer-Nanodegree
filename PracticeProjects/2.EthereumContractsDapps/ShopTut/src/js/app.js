App = {
    web3Provider: null,
    contracts: {},

    init: async function() {
        // Load items.
        $.getJSON('../items.json', function(data) {
            var itemsRow = $('#itemsRow');
            var itemTemplate = $('#itemTemplate');

            for (i = 0; i < data.length; i++) {
                itemTemplate.find('.panel-title').text(data[i].name);
                itemTemplate.find('img').attr('src', data[i].picture);
                itemTemplate.find('.item-location').text(data[i].location);
                itemTemplate.find('.btn-buy').attr('data-id', data[i].id);

                itemsRow.append(itemTemplate.html());
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

        return App.initContract();
    },

    initContract: function() {
        $.getJSON('Buying.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with @truffle/contract
            var BuyingArtifact = data;
            App.contracts.Buying = TruffleContract(BuyingArtifact);

            // Set the provider for our contract
            App.contracts.Buying.setProvider(App.web3Provider);

            // Use our contract to retrieve and mark the item purchased
            return App.markBuying();
        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', '.btn-buy', App.handleBuying);
    },

    markBuying: function() {
        var buyingInstance;

        App.contracts.Buying.deployed()
            .then(function(instance) {
                buyingInstance = instance;

                return buyingInstance.getBuyers.call();
            })
            .then(function(buyers) {
                for (i = 0; i < buyers.length; i++) {
                    if (buyers[i] !== '0x0000000000000000000000000000000000000000') {
                        $('.panel-item')
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

    handleBuying: function(event) {
        event.preventDefault();

        var itemId = parseInt($(event.target).data('id'));

        var buyingInstance;

        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            }

            var account = accounts[0];

            App.contracts.Buying.deployed()
                .then(function(instance) {
                    buyingInstance = instance;

                    // Execute buy as a transaction by sending account
                    return buyingInstance.buy(itemId, { from: account });
                })
                .then(function(result) {
                    return App.markBuying();
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