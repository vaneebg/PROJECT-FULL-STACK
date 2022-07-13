describe('Probando ciclo de autenticación', () => {

  beforeEach(() => {
    cy.restoreLocalStorage("user")
  })

  afterEach(() => {
    cy.saveLocalStorage("user")
  })

  it('Comprobando que existe la página y que se muestra carrousel', () => {
    cy.visit('http://localhost:3000')
    cy.get('.carrousel').should('be.visible')
  })

  it("Testing register", function () {
    cy.get('.ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab > #rc-tabs-0-tab-1 > .contentHome').click()
     cy.get('input[name="username"]').click().type('german')
     cy.get('input[name="email"]').click().type('german@gmail.com')
     cy.get('input[name="age"]').click().type('31')
     cy.get('input[name="password"]').click().type('test')
     cy.get('input[name="password2"]').click().type('test')
     cy.wait(3000)
     cy.get('input[type="file"]').attachFile('1.png');
     cy.wait(2000)
     cy.get('[type="submit"]').click()
     cy.get('body').click()
     cy.wait(4000)
     cy.get('div > .ant-notification-notice > .ant-notification-notice-content > .ant-notification-notice-with-icon > .ant-notification-notice-description').should('have.text','Usuario registrado con éxito')  
  });

  it("Testing login", function () {
    cy.request('get','https://red-social-vaneebg.herokuapp.com/users/confirmTesting')
    cy.wait(3000)
    cy.contains('Login').click()
    cy.get('input[name="email"]').click().type('german@gmail.com')
    cy.get('input[name="password"]').click().type('test')
    cy.get('[type="submit"]').click()
    cy.wait(3000)
    cy.get('div > .ant-notification-notice > .ant-notification-notice-content > .ant-notification-notice-with-icon > .ant-notification-notice-description').should('have.text', 'Bienvenidx a nuestra suuuper red social german!!')
    cy.url().should('include', '/main')
    cy.wait(3000)
    cy.window()
      .its("store")
      .invoke("getState")
      .its("auth.user.user")
      .should("deep.include", {
        email: 'german@gmail.com',
        username: 'german'
      });
  });

  it("Testing logout",function(){
    cy.wait(3000)
    cy.get('.right > .profileIcon > .nameAndI > a > .usernameProfile').click()
    cy.wait(3000)
    cy.url().should('include', '/profile')
    cy.get('.anticon-poweroff').click()
    cy.wait(3000)
    cy.window()
      .its("store")
      .invoke("getState")
      .its("auth.user.user")
      .should("deep.equal", null);
  });

  it("Testing login admin y borrar user", function () {
    cy.wait(3000)
    cy.get('input[name="email"]').click().type('admin@gmail.com')
    cy.get('input[name="password"]').click().type('test')
    cy.get('[type="submit"]').click()
    cy.wait(4000)
    cy.get('.linkAdmin').click()
    cy.url().should('include', '/admin')
    cy.wait(3000)
    cy.get('.ant-btn').last().click()
    cy.get('.ant-btn-primary').last().click()
    cy.wait(3000)
    cy.contains('german').should('not.exist');
  });
  
})
