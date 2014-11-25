'use strict';

describe('Protractor Test Runner', function () {

  it('should run tests', function () {
    browser.get('index.html');
    expect(browser.getTitle()).toEqual('Mesta');
  });

});
