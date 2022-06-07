import { describe, expect, test } from "vitest";
import { formatCurrency } from ".";

describe("formatCurrency", () => {
  test("positive currency", () => {
    expect(formatCurrency(100)).toEqual("$100");
  });

  test("negative currency", () => {
    expect(formatCurrency(-100)).toEqual("-$100");
  });

  test("decimal currency", () => {
    expect(formatCurrency(100.1)).toEqual("$100.1");
  });
});
