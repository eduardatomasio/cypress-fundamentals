/// <reference types="cypress" />

describe("Submit sessions", () => {
    beforeEach(() => {
        cy.clickViewSessions();
        cy.get("a").contains("Submit a Session!").click();
    });

    it("Should navigate to submit sessions page", () => {
        cy.url().should("include", "/sessions/new");
    });

    it("Should submit a session successfully", () => {
        // Filling the form
        cy.contains("Title").type("New session title");
        cy.contains("Description").type("New session description");
        cy.contains("Day").type("Friday");
        cy.contains("Level").type("Basic");
        
        // Submit form
        cy.get("form").submit();

        // Validate that form was submitted successfully
        cy.contains("Session Submitted Successfully!");
    });
} );