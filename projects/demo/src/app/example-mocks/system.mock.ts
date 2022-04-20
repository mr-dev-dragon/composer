

const system_list = {
    'sys-rhAUvsBsBo': {
        Bookings: [{
            today: ['Yes'],
            $power: function () {
                this._system.Bookings[0].today = [...this._system.Bookings[0].today, 'No'];
            }
        }]
    }
};

window.control.systems = system_list;
