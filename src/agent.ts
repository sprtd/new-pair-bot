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

    createdPairs.forEach(createdPair => {
      const { transaction, network } = txEvent;
      console.log(`network: ${network}`)
      console.log(`transaction: ${transaction}`)

      
      
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
