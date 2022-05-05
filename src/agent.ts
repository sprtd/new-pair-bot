import {
  Finding,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
} from "forta-agent";

import { formatEther } from "@ethersproject/units";

import {  
  createFinding, 
  contractMetadata, 
  contractType, 
  newPairParamsType, 
  newPairFindingType 
} from "./utils";

import { GLOBALS } from "./constants";

const { 
  APEFACTORY_ADDRESS,
  CREATE_PAIR_FUNCTION
} = GLOBALS;

const newPairParams: newPairParamsType = {
    address: APEFACTORY_ADDRESS,
    createFunctionSig: CREATE_PAIR_FUNCTION
}

const mintTxHandler = ({ address, createFunctionSig }: newPairParamsType): HandleTransaction => {
  return async (txEvent: TransactionEvent): Promise<Finding[]> => {
    const findings: Finding[] = [];

    const createdPairs = txEvent.filterFunction(createFunctionSig, address);

    const addr1: string = '0x8F667304b58B548C73F0B74369A027FEf048dc3b'
    let addr2: string = '  0x8F6673048B548C73F0B74369A027FEf048dc3b'
    addr2.toUpperCase()
    console.log(`address 2: ${addr2}`)

    if(addr1 === addr2) {
      console.log(`same address: ${true}`)
    } else {
      console.log(`not same address: ${false}`)
      
    }
    createdPairs.forEach(createdPair => {
      const { transaction, network } = txEvent;
      console.log(`network: ${network}`)
      console.log(`transaction: ${transaction}`)

      
      0x8F667304b58B548C73F0B74369A027FEf048dc3b
      // const txTo: string | undefined = transaction.to?.toString();

      // const { args } = createPair;
      // const [amount] = args;

      // const txValue: string = formatEther(amount);

      // const botMetaData = {
      //   from: transaction.from,
      //   to: txTo,
      //   value: txValue,
      //   network: network.toString(),
      // };

      // const txValueToNum: number = parseFloat(txValue);

      // if (txValueToNum >= BANANA_MINT_AMOUNT) {
      //   findings.push(createFinding(botMetaData));
      // }

      console.log(`created pair: ${createdPair}`)
      console.log({...createdPair})
    });
    return findings;
  };
};

export default {
  handleTransaction: mintTxHandler(newPairParams)
};

export { mintTxHandler };
