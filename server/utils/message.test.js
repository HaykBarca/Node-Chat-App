const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message', () => {
        var message = generateMessage('Hayk', 'Hello World');

        expect(message.from).toBe('Hayk');
        expect(message.text).toBe('Hello World');
        expect(typeof message.createdAt).toBe('number');
    });
});