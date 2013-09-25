# Angular Services Test

## Herramientas

### Yeoman

Modern workflows for modern webapps

### Generator-angular

    yo angular ngServiceTest

### Grunt

The JavaScript Task Runner

    $ grunt server
    $ grunt test

### Karma

Servicio de testing javascript creado por Google.

### Jasmine

Jasmine is a behavior-driven development framework for testing JavaScript code

    describe("A suite", function() {
      it("contains spec with an expectation", function() {
        expect(true).toBe(true);
      });
    });

### angular-mock.js

contains testing related code.

    $httpBackend // simulador de http requests

### Bower

A package manager for the web

bower.json:

    {
      "name": "ngServiceTest",
      "version": "0.0.0",
      "dependencies": {
        "unstable-angular-complete": "1.2.0rc2",
        "angular-restmod": "*"
      }
    }

    $ bower install

## Algunas Configuraciones

Gruntfile.js

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: false
      }
    },

karma.conf.js

