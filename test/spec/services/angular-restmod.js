'use strict';

describe("RestMod", function() {

  beforeEach(module('plRestmod'));

  it("contains spec with an expectation", inject(function($restmod, $httpBackend) {

    $httpBackend.when('GET', '/api/books?minPages=100').respond([ {name: 'Los piratas del Caribe' }]);

    var Books = $restmod('/api/books');

    var books = Books.$search({ minPages: 100 });

    $httpBackend.flush();

  	expect(books.length).toEqual(1);
  }));
});
