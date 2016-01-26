
module.exports = function () {

    var service = {
        attend: attend
        //createEvent: createEvent,
        //deleteEvent: deleteEvent
    };
    return service;

    function attend(event, user) {
        var isSigned = event.users.filter(function (u) {
                if (user) {
                    return u.id === user.id;
                }
            }) > 0;
        if (!isSigned) {
            event.users.push(user);
        } else {
            event.users.pop(user);
        }
        return event;
    }
};
