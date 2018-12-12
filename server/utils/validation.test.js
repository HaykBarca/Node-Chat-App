const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non string values', () => {
        var realString = isRealString(123);

        expect(typeof realString).toBe('boolean');
        expect(realString).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var realString = isRealString('   ');

        expect(typeof realString).toBe('boolean');
        expect(realString).toBe(false);
    });

    it('should allow strings with non-space characters', () => {
        var realString = isRealString('   realSteel  ');

        expect(typeof realString).toBe('boolean');
        expect(realString).toBe(true);
    });
});