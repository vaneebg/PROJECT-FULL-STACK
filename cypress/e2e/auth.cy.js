describe('Probando ciclo de autenticación', () => {

  it('Comprobando que existe la página y que se muestra carrousel', () => {
    cy.visit('http://localhost:3000')
    cy.get('.carrousel').should('be.visible')
  })

  it("Probando register", function() {
    cy.get('.ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab > #rc-tabs-0-tab-1 > .contentHome').click()
   cy.get('input[name="username"]').click().type('german')
   cy.get('input[name="email"]').click().type('german@gmail.com')
   cy.get('input[name="age"]').click().type('31')
   cy.get('input[name="password"]').click().type('test')
   cy.get('input[name="password2"]').click().type('test')
   cy.get('input[type="file"]').attachFile('1.png');
   cy.wait(3000)
   cy.get('[type="submit"]').click()
   cy.wait(1000)

   cy.get('div > .ant-notification-notice > .ant-notification-notice-content > .ant-notification-notice-with-icon > .ant-notification-notice-description').should('have.text','Usuario registrado con éxito')  
   
   

    });
})


