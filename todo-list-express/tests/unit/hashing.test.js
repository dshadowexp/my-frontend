const { hashPassword, validatePassword } = require('../../utils/hashing');

describe('hashing', () => {
    const password = 'test12345678';
    let hashedPassword;
    
    it('should not be equal to the hashedPassword', async () => {
        hashedPassword = await hashPassword(password);
        expect(password === hashedPassword).toBeFalsy();
    });

    it('should validate the password on check', async () => {
        const validation = await validatePassword(password, hashedPassword);
        expect(validation).toBeTruthy();
    });

    it('should not validate a difference password', async () => {
        const wrongPassword = 'testTheWrongPassword';
        const validation = await validatePassword(wrongPassword, hashedPassword);
        expect(validation).toBeFalsy();
    })
})