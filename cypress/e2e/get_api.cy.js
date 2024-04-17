describe('Rest API Testing with Cypress', () => {
  it('passes', () => {
    cy.request('/users/2').as('user')
    cy.get('@user').then((response) => {
      cy.log(JSON.stringify(response.body.data.email))
      cy.log(JSON.stringify(response.headers))
    })
  })

  it('API Test - Header validation', () => {
    cy.request('/users/2').as('user')
    cy.get('@user').its('headers').its('content-type').should('contain', 'application/json')
    cy.get('@user').its('headers').its('connection').should('contain', 'keep-alive')
  })

  it('API Test - Status code', () => {
    cy.request('/users/2').as('existingUser')
    cy.get('@existingUser').its('status').should('eq', 200)


    cy.request({ url:'/users/non-existant', failOnStatusCode: false }).as('nonExistingUser')
    cy.get('@nonExistingUser').its('status').should('eq', 404)
  })
})