/// <reference types="cypress" />

describe("testing form", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("form does not work if inputs are not validated", () => {
    cy.get("[data-type=transaction-submit]").click();
    cy.contains("you're account number or amount is unvalid").should("exist");
    cy.get("[data-type=amount]").type("abc");
    cy.contains("you're account number or amount is unvalid").should("exist");
  });
  it("new transaction is added if the data be valid", () => {
    cy.get("[data-type=account-id]").type(
      "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2"
    );

    cy.get("[data-type=amount]").type(968);
    cy.get("[data-type=transaction-submit]").click();
    cy.get(
      "[data-type=transaction][data-account-id=0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2][data-amount=522]"
    );
  });
});
