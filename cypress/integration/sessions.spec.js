/// <reference types="cypress" />

describe("Sessions page", () => {
    beforeEach(() => {
       cy.clickViewSessions();

        // Aliases
        cy.dataCy("AllSessions").as("AllSessionsBtn");
        cy.dataCy("Wednesday").as("WednesdayBtn");;
        cy.dataCy("Thursday").as("ThursdayBtn");;
        cy.dataCy("Friday").as("FridayBtn");;

    });

    it("Should navigate to conference sessions page and view day filter buttons", () => {
        // Validate that filter buttons exists
        cy.get("@AllSessionsBtn");
        cy.get("@WednesdayBtn");
        cy.get("@ThursdayBtn");
        cy.get("@FridayBtn");
    });
    
    /*it("should filter sessions and only display wednesday sessions when Wednesday button is clicked", () => {
        cy.intercept("POST", "http://localhost:4000/graphql").as("getSessionsInfo");
        cy.get("@WednesdayBtn").click();
        cy.wait("@getSessionsInfo")

        // Assertions
        cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
        cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
        cy.get("[data-cy=day]").contains("Friday").should("not.exist");   
    });*/

    it("should filter sessions and only display thursday sessions when Thursday button is clicked", () => {
        cy.intercept("POST", "http://localhost:4000/graphql").as("getSessionsInfo");
        cy.get("@ThursdayBtn").click();
        cy.wait("@getSessionsInfo")

        // Assertions
        cy.dataCy("day").contains("Wednesday").should("not.exist");
        cy.dataCy("day").contains("Thursday").should("be.visible");
        cy.dataCy("day").contains("Friday").should("not.exist");   
    });

    it("should filter sessions and only display friday sessions when Friday button is clicked", () => {
        cy.intercept("POST", "http://localhost:4000/graphql", {fixture: "sessions.json"}).as("getSessionsInfo");
        cy.get("@FridayBtn").click();
        cy.wait("@getSessionsInfo")

        // Assertions
        cy.dataCy("day").should("have.length", 4);
        cy.dataCy("day").contains("Wednesday").should("not.exist");
        cy.dataCy("day").contains("Thursday").should("not.exist");
        cy.dataCy("day").contains("Friday").should("be.visible");   
    });

    it("should filter sessions and display all sessions when All Sessions button is clicked", () => {
        cy.intercept("POST", "http://localhost:4000/graphql").as("getSessionsInfo");
        cy.get("@AllSessionsBtn").click();
        cy.wait("@getSessionsInfo")

        // Assertions
        cy.dataCy("day").contains("Wednesday").should("be.visible");
        cy.dataCy("day").contains("Thursday").should("be.visible");
        cy.dataCy("day").contains("Friday").should("be.visible");  
    });
} );