const {expect} =require("chai");
const { ethers } = require("hardhat");


describe("Token contract",function () {
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function(){
     Token = await ethers.getContractFactory("Token");
     [owner,addr1,addr2,...addrs]= await ethers.getSigners();
     hardhatToken=await Token.deploy();
    });

    describe("Deployment", function(){
       it("Should set the right owner",async function(){
           expect(await hardhatToken.owner()).to.equal(owner.address);
          })
          it("should assign the total supply of tokens to the owner",async function(){

            const ownerBalance= await hardhatToken.balanceof(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);

          });
        });
            
        describe("Transaction", function(){
            it("Should transfer tokens between accounts",async function(){
             await hardhatToken.transfer(addr1.address,5);
             const addr1Balance =await hardhatToken.balanceof(addr1.address);
             expect(addr1Balance).to.equal(5);
            await hardhatToken.connect(addr1).transfer(addr2.address,5);
            const addr2Balance =await hardhatToken.balanceof(addr2.address);
            expect(addr2Balance).to.equal(5);
            
     });  
     it("should fail if sender does not have enough tokens",async function() {
           const initialOwnerBalance= await hardhatToken.balanceof(owner.address);
           await expect(hardhatToken.connect(addr1).transfer(owner.address,1)).to.be.revertedWith("Not enough balance");
            expect(await hardhatToken.balanceof(owner.address)).to.equal(initialOwnerBalance);
     });
     it("should update balnces after transfers",async function() {
        const initialOwnerBalance= await hardhatToken.balanceof(owner.address); 
        await hardhatToken.transfer(addr1.address,5);
        await hardhatToken.transfer(addr2.address,10);
        const finalOwnerBalance=await hardhatToken.balanceof(owner.address);
        expect(finalOwnerBalance).to.equal(initialOwnerBalance-15);
        const addr1Balance =await hardhatToken.balanceof(addr1.address);
        expect(addr1Balance).to.equal(5);
        const addr2Balance =await hardhatToken.balanceof(addr2.address);
        expect(addr2Balance).to.equal(10);




     });

    });        
});



    
        
        