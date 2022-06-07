import { describe, expect, test, vi } from "vitest";
import mount from "../../test";
import * as API from "../apis";
import { Transaction } from "../types";
import useTransactions from "./transactions";

describe("transactions composable", () => {
  const initialize = () => {
    vi.spyOn(API, "getTransactions").mockImplementationOnce(() =>
      Promise.resolve([])
    );

    const { result } = mount(() => useTransactions());

    return result;
  };

  test("initial values", async () => {
    const { errorMessage, isLoading, transactions } = useTransactions();

    expect(transactions.value).toEqual([]);
    expect(isLoading.value).toEqual(false);
    expect(errorMessage.value).toEqual(null);
  });

  test("load transactions on mount", () => {
    initialize();

    setTimeout(() => expect(API.getTransactions).toHaveBeenCalled());
  });

  test("add transaction", () => {
    const { addTransaction, transactions } = initialize();

    const transaction: Transaction = {
      transaction_id: "1",
      account_id: "1",
      amount: 100,
      created_at: new Date().toISOString(),
    };

    addTransaction(transaction);

    expect(transactions.value).toEqual([transaction]);
  });

  test("load transactions", () => {
    const {
      errorMessage,
      isLoading,
      retry: loadTransactions,
      transactions,
    } = initialize();

    const testTransactions: Transaction[] = [
      {
        transaction_id: "9b7b3d85-6b97-4e29-b407-5b1348d9a92f",
        account_id: "48c0e1c6-9247-4c06-98bd-09b17f284bb6",
        amount: -5,
        created_at: "2022-06-07T07:52:03.674877+00:00",
      },
      {
        transaction_id: "2e0c3786-2c0e-4d89-a609-ef4b93ba190b",
        account_id: "48c0e1c6-9247-4c06-98bd-09b17f284bb6",
        amount: 7,
        created_at: "2022-06-07T07:52:00.966277+00:00",
      },
      {
        transaction_id: "e15992e8-3568-487b-a381-83c13424b89e",
        account_id: "049b4aa9-4a88-4d21-a129-27b80abbaf7f",
        amount: 7,
        created_at: "2022-06-07T07:51:57.689773+00:00",
      },
      {
        transaction_id: "659e750c-eba1-4e8a-af8e-b2f30c1b3266",
        account_id: "049b4aa9-4a88-4d21-a129-27b80abbaf7f",
        amount: 30,
        created_at: "2022-06-07T07:51:54.893735+00:00",
      },
    ];

    vi.spyOn(API, "getTransactions").mockImplementation(() =>
      Promise.resolve(testTransactions)
    );

    loadTransactions();

    setTimeout(() => {
      expect(transactions.value).toEqual(testTransactions);
      expect(isLoading.value).toEqual(false);
      expect(errorMessage.value).toEqual(null);
    });
  });

  test("show error on loading transactions", () => {
    const {
      errorMessage,
      isLoading,
      retry: loadTransactions,
      transactions,
    } = initialize();

    const error = "error loading transactions";

    vi.spyOn(API, "getTransactions").mockImplementationOnce(() =>
      Promise.reject<Transaction[]>(new Error(error))
    );

    loadTransactions();

    setTimeout(() => {
      expect(errorMessage.value).toEqual(error);
      expect(transactions.value).toEqual([]);
      expect(isLoading.value).toEqual(false);
    });
  });
});
