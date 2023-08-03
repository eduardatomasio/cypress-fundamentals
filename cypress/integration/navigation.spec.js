/// <reference types="cypress" />

describe("Navigation", () => {
    it("Should navigate to conference sessions page", () => {
        cy.clickViewSessions();
    });
} );