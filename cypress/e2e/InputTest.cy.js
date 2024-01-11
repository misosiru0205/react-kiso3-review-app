/* eslint-disable no-undef */
describe('template spec', () => {

  beforeEach(()=>{//it前に必ず読み込むところ
    cy.visit('http://localhost:3000')
  })

  it('test1', () => {
    

    const email = "test@test.com"
    const name = "taniguchi"

    cy.get('#input-email').clear().type(email)  // emailの入力
    cy.get('#input-name').clear().type(name)  // nameの入力
    cy.get('#input-button').click()  // ボタンを押す
    cy.get('#result-email').should('have.text','')//エラーメッセージが無い事の確認
    cy.get('#result-name').should('have.text','')//エラーメッセージが無い事の確認
    
  })

  it('test2', () => {

    cy.get('#input-email').clear()  
    cy.get('#input-name').clear() 
    cy.get('#input-button').click()  // ボタンを押す
    cy.get('#result-email').should('have.text','Emailを入力してください')//エラーメッセージがある事の確認
    cy.get('#result-name').should('have.text','名前を入力してください')//エラーメッセージがある事の確認
    
  })
})