/// <reference types="cypress" />

describe("Sessions page", () => {
    it("Should navigate to conference sessions page and view day filter buttons", () => {
        cy.visit("/conference");
        cy.get("h1").contains("View Sessions").click();
        cy.url().should("include", "/sessions");

        // Validate that filter buttons exists
        cy.get("[data-cy=AllSessions]");
        cy.get("[data-cy=Wednesday]");
        cy.get("[data-cy=Thursday]");
        cy.get("[data-cy=Friday]");
    });

    it("should filter sessions and only display wednesday sessions when Wednesday button is clicked", () => {
        cy.get("[data-cy=Wednesday]").click();

        // Assertions
        cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
        cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
        cy.get("[data-cy=day]").contains("Friday").should("not.exist");   
    });
} );