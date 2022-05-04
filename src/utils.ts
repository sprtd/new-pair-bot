import { Finding, FindingSeverity, FindingType, LogDescription, ethers } from "forta-agent";
import { GLOBALS } from "./constants";
const { 
    CREATE_PAIR_FUNCTION,
    APEFACTORY_ADDRESS,
} = GLOBALS;

// finding type definition
type newPairFindingType = {
  tokenAName: string
  tokenAAddress: string;
  tokenBName: string;
  tokenBAddress: string;
  contractDeployer: string
  contractName: string
  timestamp: string
  network: string
};

type contractType = {
  address: string;
};

type newPairParamsType = {
    address: string,
    createFunctionSig: string
}



const contractMetadata: contractType = {
  address: APEFACTORY_ADDRESS
};

let findingMetada: newPairFindingType

const createFinding = (findingMetada: newPairFindingType): Finding => {
  let txNetwork: string = "";
  if (findingMetada.network === "56") {
    txNetwork = "BNB Chain";
  } else {
    txNetwork = "Polygon";
  }

  const findingResult = {
    name: "new pair creation detection bot",
    description: `Detect the creation of new tradable pairs on Apeswap`,
    alertId: "APESWAP-8",
    severity: FindingSeverity.Info,
    type: FindingType.Info,
    protocol: "Apeswap",
    metadata: findingMetada
  }
  return Finding.fromObject(findingResult);
};

export { 
    createFinding,
    newPairFindingType, 
    contractType, 
    contractMetadata, 
    newPairParamsType
};
