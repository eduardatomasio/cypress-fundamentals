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
} );