import { Contract, Signer } from 'ethers'
import * as hre from 'hardhat'
import { XBitcoinToken } from '../../types/typechain'

const { getNamedSigner, contracts, deployments, ethers } = hre

interface TestSetupResult {
  zxbtc: XBitcoinToken
 
  user: Signer
  filler: Signer
}

 
export const setup = deployments.createFixture<TestSetupResult, never>(async () => {
  await hre.deployments.fixture('primary', {
    keepExistingDeployments: false
  })

  const user = await getNamedSigner('borrower')
  const filler = await getNamedSigner('lender')

  const zxbtc = await contracts.get<XBitcoinToken>('_0xBitcoinToken')
   
  

  return {
    zxbtc,
    
    user,
    filler,
  }
})
