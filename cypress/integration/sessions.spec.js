/// <reference types="cypress" />

describe("Sessions page", () => {
    beforeEach(() => {
        cy.visit("/conference");
        cy.get("h1").contains("View Sessions").click();
        cy.url().should("include", "/sessions");

        // Aliases
        cy.get("[data-cy=AllSessions]").as("AllSessionsBtn");
        cy.get("[data-cy=Wednesday]").as("WednesdayBtn");;
        cy.get("[data-cy=Thursday]").as("ThursdayBtn");;
        cy.get("[data-cy=Friday]").as("FridayBtn");;

    })

    it("Should navigate to conference sessions page and view day filter buttons", () => {
        // Validate that filter buttons exists
        cy.get("@AllSessionsBtn");
        cy.get("@WednesdayBtn");
        cy.get("@ThursdayBtn");
        cy.get("@FridayBtn");
    });

    it("should filter sessions and only display wednesday sessions when Wednesday button is clicked", () => {
        cy.intercept("POST", "http://localhost:4000/graphql").as("getSessionsInfo");
        cy.get("@WednesdayBtn").click();
        cy.wait("@getSessionsInfo")

        // Assertions
        cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
        cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
        cy.get("[data-cy=day]").contains("Friday").should("not.exist");   
    });

    it("should filter sessions and only display thursday sessions when Thursday button is clicked", () => {
        cy.intercept("POST", "http://localhost:4000/graphql").as("getSessionsInfo");
        cy.get("@ThursdayBtn").click();
        cy.wait("@getSessionsInfo")

        // Assertions
        cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
        cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
        cy.get("[data-cy=day]").contains("Friday").should("not.exist");   
    });

    it("should filter sessions and only display friday sessions when Friday button is clicked", () => {
        cy.intercept("POST", "http://localhost:4000/graphql").as("getSessionsInfo");
        cy.get("@FridayBtn").click();
        cy.wait("@getSessionsInfo")

        // Assertions
        cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
        cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
        cy.get("[data-cy=day]").contains("Friday").should("be.visible");   
    });

    it("should filter sessions and display all sessions when All Sessions button is clicked", () => {
        cy.intercept("POST", "http://localhost:4000/graphql").as("getSessionsInfo");
        cy.get("@AllSessionsBtn").click();
        cy.wait("@getSessionsInfo")

        // Assertions
        cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
        cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
        cy.get("[data-cy=day]").contains("Friday").should("be.visible");   
    });
} );