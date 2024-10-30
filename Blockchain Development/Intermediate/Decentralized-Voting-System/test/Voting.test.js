const Voting = artifacts.require("Voting");

contract("Voting", accounts => {
    let voting;

    before(async () => {
        voting = await Voting.deployed();
    });

    it("should allow the owner to add a proposal", async () => {
        await voting.addProposal("Proposal 1", { from: accounts[0] });
        const proposal = await voting.getProposal(1);
        assert.equal(proposal[0], "Proposal 1", "Proposal name should match");
    });

    it("should allow users to vote", async () => {
        await voting.vote(1, { from: accounts[1] });
        const proposal = await voting.getProposal(1);
        assert.equal(proposal[1].toNumber(), 1, "Vote count should be 1");
    });

    it("should not allow a user to vote twice", async () => {
        try {
            await voting.vote(1, { from: accounts[1] });
            assert.fail("The vote should not be allowed.");
        } catch (error) {
            assert(error.message.includes("You have already voted"), "Error message should be correct.");
        }
    });

    it("should get the winning proposal", async () => {
        const winningProposal = await voting.getWinningProposal();
        assert.equal(winningProposal, "Proposal 1", "The winning proposal should be Proposal 1.");
    });
});
