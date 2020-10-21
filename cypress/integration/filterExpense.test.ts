describe('filter expense', () => {
  before(() => {
    cy.visit('/');
    cy.findByTestId('login-logout-menu').click();
    cy.findByPlaceholderText('E-mail address').type(Cypress.env('email'));
    cy.findByPlaceholderText('Password').type(Cypress.env('password'));
    cy.findByRole('button', { name: 'Log in' }).click();
  });

  after(() => {
    cy.findByTestId('logined-user-menu').click();
    cy.findByRole('option', { name: 'Log out' }).click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.title().should('eq', 'Home | VisiBO');
  });

  it('タグで絞り込み', () => {
    const tags = [
      { text: 'その他', icon: 'tag' },
      { text: '食費', icon: 'food' },
      { text: '家賃', icon: 'home' },
      { text: '電気代', icon: 'power cord' },
      { text: '水道代', icon: 'bath' },
      { text: 'ガス代', icon: 'fire' },
      { text: '電話', icon: 'phone' },
      { text: '交通費', icon: 'subway' },
    ];
    const tag = tags[Math.floor(Math.random() * 1000) % 8];

    cy.wait(3000);
    cy.findByTestId('detail-table').findByTestId(tag.icon).click();
    cy.findAllByTestId('table-unit').first().contains(`${tag.text}`).should('exist');
  });
});
