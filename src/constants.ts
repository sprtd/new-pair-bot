import { utils } from "ethers";

const GLOBALS = {
  CREATE_PAIR_FUNCTION: "function createPair(address tokenA, address tokenB)",
  APEFACTORY_ADDRESS: "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6",
};

const FUNCTION_ABI = ([] = [GLOBALS.CREATE_PAIR_FUNCTION]);

const APEFACTORY_ABI = new utils.Interface(FUNCTION_ABI);

export { GLOBALS, FUNCTION_ABI, APEFACTORY_ABI };
