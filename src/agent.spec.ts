import {
  FindingType,
  FindingSeverity,
  Finding,
  HandleTransaction,
  TransactionEvent,
} from "forta-agent";

import { createAddress, TestTransactionEvent } from "forta-agent-tools/lib/tests";
import { providerParams } from "./utils";
import { createPairProvider } from "./agent";
import { APEFACTORY_ABI } from "./constants";

describe("New Pair Creation Test Suite", () => {
  let txEvent: TransactionEvent;
  const testTokenA: string = createAddress("0xa1");
  const testTokenB: string = createAddress("0xb2");
  const handleTransaction: HandleTransaction = createPairProvider(providerParams);

  let findings: Finding[];

  it("should return empty finding if there are no new pair creation", async () => {
    txEvent = new TestTransactionEvent();
    findings = await handleTransaction(txEvent);
    console.log(findings);
    expect(findings).toStrictEqual([]);
  });
});
