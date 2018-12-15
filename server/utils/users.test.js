const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Hayk',
            room: 'NodeCourse'
        }, {
            id: 2,
            name: 'Vahe',
            room: 'PHPCourse'
        }, {
            id: 3,
            name: 'Andrew',
            room: 'NodeCourse'
        }]
    })

    it('should add new user', () => {
        var user = {
            id: '123',
            name: 'Hayk',
            room: 'NodeCourse'
        };
        var users = new Users();
        var newUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var removedUser = users.removeUser(3);

        expect(removedUser).toEqual({id: 3, name: 'Andrew', room: 'NodeCourse'});
    });

    it('should not remove a user', () => {
        var removedUser = users.removeUser(4);

        expect(typeof removedUser).toBe("undefined");
    });

    it('should find a user', () => {
        var findUser = users.getUser(1);

        expect(findUser).toEqual([{id: 1, name: 'Hayk', room: 'NodeCourse'}]);
    });

    it('should not find a user', () => {
        var findUser = users.getUser(4);

        expect(findUser).toEqual([]);
    });

    it('should return the name of NodeCourse', () => {
        var usersArray = users.getUserList('NodeCourse');

        expect(usersArray).toEqual(['Hayk', 'Andrew']);
    });

    it('should return the name of PHPCourse', () => {
        var usersArray = users.getUserList('PHPCourse');

        expect(usersArray).toEqual(['Vahe']);
    })

})