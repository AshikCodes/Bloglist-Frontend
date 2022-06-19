
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')

    const user = {
      username: 'test-user',
      password: '12345',
      name: "Bobby"
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
  })

  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function(){
    it("Successful log in attempt", function() {
      cy.get('#username').type('test-user')
      cy.get('#password').type('12345')
      cy.get('#login-btn').click()
  
      cy.contains('Bobby logged in')
    })
  
    it("Failed log in attempt", function() {
      cy.get('#username').type('test-user')
      cy.get('#password').type('1345')
      cy.get('#login-btn').click()
  
      cy.contains("Wrong username or password")
      cy.get('.errorMsg-container').should('have.css', 'color', 'rgb(245, 70, 70)')
    })
  })
})
//npm run cypress:open