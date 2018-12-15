const _ = require('lodash');

class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        var updatedUsers = _.remove(this.users, (user) => user.id === id);

        return updatedUsers[0];
    }

    getUser (id) {
        var userById = this.users.filter((user) => user.id === id);

        return userById;
    }

    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        var usersArray = users.map((user) => user.name);

        return usersArray;
    }
}

module.exports = {Users};