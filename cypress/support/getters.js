
/**
 * Searches the provided PIXI object's children and their children
 * for a particular element ex: LoadingScreen
 * @param searchObject
 * @param element
 * @returns {element}
 */
const getPixiElementByName = (searchObject, element) => {
  const elements = [];

  const find = (children) => {
    children.forEach((item) => {
      item.name === element && elements.push(item);
      item.children.length > 0 && find(item.children);
    });
  };

  find(searchObject.children);

  return elements[0];
};

/**
 * Simulates cypress' retry functionality for custom cy. methods
 * @param {Function} callback
 * @param {Function} error
 * @returns {Promise}
 */
const tryUntil = (callback, error = 'Could not find PIXI element') => {
  return new Promise((resolve, reject) => {
    const timeLimit = Cypress.config().defaultCommandTimeout;
    let result = null,
      counter = 0;
    let intervalId = setInterval(() => {
      result = callback();
      if (result) {
        clearInterval(intervalId);
        resolve(result);
      } else {
        counter += 100;
      }
      if (counter >= timeLimit) {
        result ? resolve() : reject(error);
      }
    }, 100);
  });
};

Cypress.Commands.add('getJsApp', (error = 'Could not find JS app. Please make sure __JS_APP is exported') => {
  cy.window().then((win) => tryUntil(() => win['__JS_APP'], error));
});

Cypress.Commands.add('getPixi', (error = 'Could not find PIXI module. Please make sure PIXI is exported') => {
  cy.window().then((win) => tryUntil(() => win['PIXI'], error));
});

Cypress.Commands.add('getPixiApp', (error = 'Could not find PIXI app. Please make sure __PIXI_APP is exported') => {
  cy.window().then((win) => tryUntil(() => win['__PIXI_APP'], error));
});

Cypress.Commands.add('getPixiStage', (error = 'Could not find PIXI stage') => {
  cy.getPixiApp().then((app) => tryUntil(() => app.stage, error));
});

Cypress.Commands.add('getPixiElementByName', {
  prevSubject: true 
}, (searchObject, element, error) => tryUntil(() => getPixiElementByName(searchObject, element), error));

Cypress.Commands.add('getPixiChildAt', {
  prevSubject: true
}, (searchObject, index, error) => {
  return tryUntil(() => {
    return searchObject.children[index];
  }, error);
});

Cypress.Commands.add('getGsap', (error = 'Could not find GSAP module. Please make sure GSAP is exported') => {
  cy.window().then((win) => tryUntil(() => win['GSAP'], error));
});

Cypress.Commands.add('getGsapApp', (error = 'Could not find GSAP app. Please make sure __GSAP_APP is exported') => {
  cy.window().then((win) => tryUntil(() => win['__GSAP_APP'], error));
});
