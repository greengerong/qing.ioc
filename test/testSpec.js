'use strict';

var ioc = require('../');

var should = require('should');
require('mocha');

describe('gulp', function () {

    it('should be ok', function (done) {
        ioc.should.not.equal(undefined);
        done();
    });
});