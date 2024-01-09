/* eslint-disable no-undef */
describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

    const email = "test@test.com"
    const name = "taniguchi"

    cy.get('#input-email').clear().type(email)  // ABC と入力する
    cy.get('#input-name').clear().type(name)  // ABC と入力する
    cy.get('#input-button').click()  // ボタンを押す

    cy.get('#input-email').clear()  // ABC と入力する
    cy.get('#input-name').clear()  // ABC と入力する
    cy.get('#input-button').click()  // ボタンを押す
    
  })
})