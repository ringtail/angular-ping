/*
 * Tests angular-ping,
 *
 * To run: karma start karmanit.conf.js
 *
 * Note:
 * - Test is not self contained as we don't mock up the server response
 * - Not mocking might still be what we want to do
 * - Tests can fail from connectivity or downtime issues
 *
 * Results:
 *  This tests unfortunately show the ping is unreliable and return some incorrect results (but at least is easy to see it happening)
 *
 * * See 'FAIL' comments
 * ** To pass all test swap result of tests marked as fail
 */

describe('angular.ping', function() {
    'use strict';

    var providers = [
        { site: 'www.baidu.com', result: 'connected' },
        { site: 'baidu.com', result: 'connected' },
        { site: 'www.notexistingsite.com', result: 'disconnected' }, // FAIL
        { site: 'www.baidu.com:30', result: 'disconnected' },
        { site: 'localhost', result: 'connected' }, // Depends on your environment
        { site: '192.168.22.222', result: 'disconnected' },
        { site: 'undefined', result: 'disconnected' } // FAIL

    ]

    describe('ping service test content', function() {
        var netTesting, $timeout;
        beforeEach(module('angular.ping'));
        beforeEach(inject(function($injector, _$timeout_) {
            netTesting = $injector.get('netTesting');
            $timeout = _$timeout_;
            //jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; In case we need to wait longer
        }));
        it('should do something', function() {
            expect( !! netTesting).toBe(true);
        });
        /* As all tests are identical we can set up a loop */
        providers.forEach( function (provider) {
            it('ping ' + provider.site + ' ' + provider.result ,function(done){
                netTesting.ping(provider.site, function(site, result) {
                    expect(site).toEqual(provider.site);
                    expect(result).toEqual(provider.result);
                    done();
                });
                // We are not mocking up the site response so we really need to wait
                setInterval (
                    function() {
                        $timeout.flush();
                    },
                    2000 // Time
                );
            });

        })
    });
});
