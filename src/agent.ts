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
    address: '',
    createFunctionSig: ''
}

const mintTxHandler = (functionAbi: string, contractInfo: contractType): HandleTransaction => {
  return async (txEvent: TransactionEvent): Promise<Finding[]> => {
    const findings: Finding[] = [];

    const bananaMints = txEvent.filterFunction(functionAbi);

    bananaMints.forEach((bananaMint) => {
      const { transaction, network } = txEvent;

      const txTo: string | undefined = transaction.to?.toString();

      const { args } = bananaMint;
      const [amount] = args;

      const txValue: string = formatEther(amount);

      const botMetaData = {
        from: transaction.from,
        to: txTo,
        value: txValue,
        network: network.toString(),
      };

      const txValueToNum: number = parseFloat(txValue);

      if (txValueToNum >= BANANA_MINT_AMOUNT) {
        findings.push(createFinding(botMetaData));
      }
    });
    return findings;
  };
};

export default {
  handleTransaction: mintTxHandler(BANANA_MINT_FUNCTION, contractMetaData),
};

export { mintTxHandler };
