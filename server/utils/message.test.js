const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message', () => {
        var message = generateMessage('Hayk', 'Hello World');

        expect(message.from).toBe('Hayk');
        expect(message.text).toBe('Hello World');
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message', () => {
        var message = generateLocationMessage('Admin', 1, 1);

        expect(message.from).toBe('Admin');
        expect(message.link).toBe('https://www.google.com/maps?q=1,1');
        expect(typeof message.createdAt).toBe('number');
    });
});