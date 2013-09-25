'use strict';

var restmod, httpBackend;
var Book;
var Chapter;

describe("RestMod", function() {

  beforeEach(module('ngServiceTestApp'));

  beforeEach(inject(function($restmod, $httpBackend) {
    restmod = $restmod;
    httpBackend = $httpBackend;

    Chapter = restmod('/api/chapters');
    Book = restmod('/api/books', {chapters: {hasMany: Chapter}});

    httpBackend.when('GET', '/api/books?minPages=100').respond([ {name: 'Los piratas del Caribe' }]);
  }));

  describe('asdf', function() {

      it("contains spec with an expectation", function() {

        httpBackend.when('GET', '/api/books?minPages=100').respond([ {name: 'Los piratas del Caribe' }]);


        var books = Book.$search({ minPages: 100 });

        expect(books.length).toEqual(0);

        httpBackend.flush();

      	expect(books.length).toEqual(1);
      });


      describe("$build static methods", function() {

        it("should return book with a name", function() {
            var book = Book.$build({name: "Los piratas del Caribe"});
            expect(book.name).toEqual("Los piratas del Caribe");
        });

      });

      describe("$create static methods", function() {

        it("should return book with a name", function() {


             httpBackend.expectPOST('/api/books', {name: 'Los piratas del Caribe'}).respond(200, '{}');

            Book.$create({name: "Los piratas del Caribe"});

            httpBackend.flush();
        });

        // it("should allow an empty response", function() {
        //     httpBackend.expectPOST('/api/books', {name: 'Los piratas del Caribe'}).respond(200, '');
        //     Book.$create({name: "Los piratas del Caribe"});
        //     httpBackend.flush();
        // });

        it("should assign an ID to the new resource", function() {
            httpBackend.when('POST', '/api/books').respond(200, '{"id": 1}');
            var book = Book.$create({name: "Los piratas del Caribe"});
            expect(book.id).toBeUndefined()
            httpBackend.flush();
            expect(book.id).toEqual(1);
        });
        it("should bind to the new resource", function() {
            httpBackend.when('POST', '/api/books').respond(200, '{"id": 1}');
            var book = Book.$create({name: "Los piratas del Caribe"});
            expect(book.$isBound()).toEqual(false);
            httpBackend.flush();
            expect(book.$isBound()).toEqual(true);
        });
        it("should load chapters", function() {
            httpBackend.when('GET', '/api/books/1').respond(200, '{"id": 1, "chapters": [{"id": 2}]}');
            var book = Book.$find(1);
            httpBackend.flush();
            expect(book.chapters().length).toEqual(1);
        });
      });
  });
});


