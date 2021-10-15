import { Contract, Signer, BigNumber as BN } from 'ethers'
import * as hre from 'hardhat'
import {   XBitcoinToken } from '../types/typechain'
import { use, should } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { solidity } from 'ethereum-waffle'
import { deploy } from '../utils/deploy-helpers'
import {setup} from './helpers/setup'

use(chaiAsPromised)
use(solidity)
should()
 

describe('_0xBitcoinToken', function () {
  let zxBTCContract: XBitcoinToken
  
  let user: Signer
  let filler: Signer
   

  before(async () => {
    const result = await setup()
    zxBTCContract = result.zxbtc
    
    user = result.user
   
  })

    
  const expectSupply = function(expectedAmt:any, supplyResult:any ){
 
      let tokenSupply:string =   supplyResult.toString();      
      
      console.log(tokenSupply);

      (tokenSupply.toString() ).should.equal(expectedAmt.toString());

  }

  describe('_0xBitcoinToken', () => {
    it('should have the _0xBitcoinToken address set', async () => {
      const addr = zxBTCContract.address
      addr.should.exist
    })


    it('should be mintable', async () => {

      let result = await zxBTCContract.connect(user).mintWithoutPoW()
  
      await expectSupply('5000000000', await zxBTCContract.tokensMinted()) 

      await zxBTCContract.connect(user).mintWithoutPoW()
  
      await expectSupply('10000000000', await zxBTCContract.tokensMinted()) 

      
    })    

    it('should do halvening 1', async () => {

      let result = await zxBTCContract.connect(user).setTokensMinted( '1049990000000000' )
  
      await expectSupply('1049990000000000', await zxBTCContract.tokensMinted()) 

      await zxBTCContract.connect(user).mintWithoutPoW()
  
      await expectSupply('1049995000000000', await zxBTCContract.tokensMinted()) 

      await zxBTCContract.connect(user).mintWithoutPoW()
  
      await expectSupply('1050000000000000', await zxBTCContract.tokensMinted()) 

      await zxBTCContract.connect(user).mintWithoutPoW()
  
      await expectSupply('1050002500000000', await zxBTCContract.tokensMinted())  


      
    })    

    it('should do halvening 2', async () => {

      let result = await zxBTCContract.connect(user).setTokensMinted( '1574995000000000' )
  
      await expectSupply('1574995000000000', await zxBTCContract.tokensMinted()) 

      await zxBTCContract.connect(user).mintWithoutPoW()
  
      await expectSupply('1574997500000000', await zxBTCContract.tokensMinted()) 

      await zxBTCContract.connect(user).mintWithoutPoW()
  
      await expectSupply('1575000000000000', await zxBTCContract.tokensMinted()) 

      await zxBTCContract.connect(user).mintWithoutPoW()
  
      await expectSupply('1575001250000000', await zxBTCContract.tokensMinted())    
      
    })     

  })

    
 
})
