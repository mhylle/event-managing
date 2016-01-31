/* jshint -W117, -W030 */
describe('GroupListController', function () {
    var controller;
    var groups = mockData.getMockGroups();
    bard.verifyNoOutstandingHttpRequests();

    beforeEach(function () {
        module('event-managing-groups');
        bard.inject('$controller', '$rootScope', '$q', '$state');
    });

    describe('Controller Initialization', function () {
        beforeEach(function () {
            var gs = {
                getGroups: function () {
                    return $q.when(groups);
                }
            };
            controller = $controller('grouplistcontroller', {
                groupservice: gs
            });
        });
        describe('With valid data', function () {

            it('Should exist', function () {
                expect(controller).to.exist;
            });

            it('should have empty groups array before activation', function () {
                expect(controller.groups).to.exist;
            });

            describe.skip('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should have events', function () {
                    expect(controller.groups).to.have.length.above(0);
                });

                it('should have mock events', function () {
                    expect(controller.groups).to.have.length(2);
                });

                it('should have an empty status message', function () {
                    expect(controller.status.message).to.be.empty;
                });

                it('should have a status.response', function () {
                    expect(controller.status.response).to.exist;
                });

                it('should have a response.status that is ok', function () {
                    expect(controller.status.response).to.equal('RESPONSE_OK');
                });
            });
            describe('Should navigate to the correct state when choosing a group', function () {
                beforeEach(function () {
                    //bard.inject('$state');
                    $rootScope.$apply();
                });
                it('should navigate to groups.view on gotoGroup', function () {
                    //controller.gotoEvent(1);
                    //$rootScope.$apply();
                    //expect($state).is('events.view');
                });
            });
        });

        describe.skip('With failed service', function () {
            beforeEach(function () {
                var gs = {
                    getGroups: function () {
                        return $q.when({});
                    }
                };
                controller = $controller('grouplistcontroller', {
                    groupservice: gs
                });
            });
            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should not have events', function () {
                    expect(controller.groups).to.have.length(0);
                });

                it('should have a response.status that failed', function () {
                    expect(controller.status.response).to.equal('RESPONSE_ERROR');
                });

                it('should have a response.status.code error', function () {
                    expect(controller.status.code).to.equal('error');
                });

                it('should have a status message', function () {
                    expect(controller.status.message).not.to.be.empty;
                });

            });
        });
        describe('With crashed service', function () {
            beforeEach(function () {
                var gs = {
                    getGroups: function () {
                        return $q.when({});
                    }
                };
                controller = $controller('grouplistcontroller', {
                    groupservice: gs
                });
            });
            describe('After activation', function () {
                beforeEach(function () {
                    $rootScope.$apply();
                });

                it('should not have events', function () {
                    expect(controller.groups).to.have.length(0);
                });

                it('should have no response.status ', function () {
                    expect(controller.status.response).not.to.exist;
                });

                it('should have a response.status.code warning', function () {
                    expect(controller.status.code).to.equal('warning');
                });

                it('should have not have a status message', function () {
                    expect(controller.status.message).to.be.empty;
                });

            });
        });
    });
});
