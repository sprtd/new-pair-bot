import { Finding, HandleTransaction, TransactionEvent } from "forta-agent";

import { createFinding, newPairParamsType, newPairFindingType, providerParams } from "./utils";

const createPairProvider = ({ createFunctionSig, address }: newPairParamsType): HandleTransaction => {
  return async (txEvent: TransactionEvent): Promise<Finding[]> => {
    const findings: Finding[] = [];
    const createPairFunctionCalls: string[] = [];

    const txLogs = txEvent.filterFunction(createFunctionSig, address);

    txLogs.forEach((txLog) => {
      const { args, name } = txLog;

      const newPairMetadata: newPairFindingType = {
        tokenAAddress: args[0],
        tokenBAddress: args[1],
        contractDeployer: txEvent.from,
        timestamp: new Date(txEvent.timestamp * 1000).toString(),
      };

      findings.push(createFinding(newPairMetadata));
    });
    return findings;
  };
};
export default {
  handleTransaction: createPairProvider(providerParams),
};

export { createPairProvider };
