'use strict';

// Set the jasmine fixture path
// jasmine.getFixtures().fixturesPath = 'base/';

describe('angular.ping', function() {
    describe('ping service test content', function() {
        var netTesting;
        beforeEach(module('angular.ping'));
        beforeEach(inject(function($injector) {
            netTesting = $injector.get('netTesting');
        }));
        it('ping wwww.baidu.com success',function(){
            /*
                how to test a async function
                need add test
             */
        })
    })
});
