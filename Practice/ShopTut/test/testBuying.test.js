const Buying = artifacts.require('Buying');

contract('Buying', accounts => {
    let buying;
    let expectedAdopter;

    before(async() => {
        buying = await Buying.deployed();
    });

    describe('Buying an item and retrieving account addresses', async() => {
        before('Buying an item using accounts[0]', async() => {
            await buying.buy(8, { from: accounts[0] });
            expectedBuyer = accounts[0];
        });

        it('can fetch the address of an owner by item id', async() => {
            const buyer = await buying.buyers(8);
            assert.equal(
                buyer,
                expectedBuyer,
                'The owner of the purchased item should be the first account.'
            );
        });
        it("can fetch the collection of all item owners' addresses", async() => {
            const buyers = await buying.getBuyers();
            assert.equal(
                buyers[8],
                expectedBuyer,
                'The owner of the purchased item should be in the collection.'
            );
        });
    });
});