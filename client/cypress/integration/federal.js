describe("Unit test the Federal overview", () => {
  it("loads", () => {
    cy.visit("/");
  });

  it("has all projection sites", () => {
    assert(cy.get(".infoIcon").should("be.visible"));
    cy.get(".infoIcon").each((elem, i) => {
      if (i > 2) {
        return false;
      }
      cy.wrap(elem)
        .trigger("mouseover")
        .trigger("mouseenter")
        .then(() => {
          assert(cy.get(".table-projection").should("be.visible"));
          assert(
            cy
              .get(".table-projection tr")
              .should("have.length", 3) // TODO: change to 4 when projection is back
              .each(tr => {
                cy.wrap(tr)
                  .invoke("text")
                  .then(text => {
                    cy.log(text);
                    assert(/^\w((\s|\w)*(\d+\.)?\d+)$/.test(text));
                  });
              })
          );
        });
      cy.wrap(elem)
        .trigger("mouseleave")
        .trigger("mouseout");
    });
  });

  it("loads logos", () => {
    cy.get(".party-logo")
      .find("img")
      .should("be.visible");
  });

  it("displays footer correctly", () => {
    cy.get("footer.footer")
      .find("a[href='https://rosshill.ca']")
      .should("be.visible");
    cy.get("footer.footer")
      .invoke("text")
      .then(text => {
        assert(text.startsWith("Made by Ross Hill"));
      });
  });
});
