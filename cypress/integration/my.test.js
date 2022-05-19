describe("users test", () => {
  it("can loads the historical transactions", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".transaction-item").should("exist");
  });
  it("can add the new transaction", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-type=account-id]")
      .should("exist")
      .type("0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2");
    cy.get("[data-type=amount]").should("exist").type(96);
    cy.get("[data-type=transaction-submit").click();
    cy.get(
      "[data-type=transaction][data-account-id=0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2][data-amount=96]"
    );
  });
});
