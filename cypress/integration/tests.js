///<reference types="cypress"/>

describe('tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:8080');
    })
    it('should have loading scene displayed', () => {
        cy.getPixiStage()
            .getPixiElementByName('loading')
            .then((element) => { expect(element).to.exist })
    })
    it('should have tutorial scene displayed', () => {
        cy.getPixiStage()
            .getPixiElementByName('tutorial')
            .then((element) => { expect(element).to.exist })
    })
    it('should have countdown scene displayed'), () => {
        cy.getPixiStage()
            .trigger('FINISH')
        cy.getPixiStage()
            .getPixiElementByName('countdown')
            .then((element) => {
                expect(element).to.exist;
            });
    }
})