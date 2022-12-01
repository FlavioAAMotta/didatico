const users = [
    {
        id: 1,
        name: 'Flávio',
        email: '',
        nickname: 'flavio',
        password: 'senha@#SuperForte'
    },
    {
        id: 2,
        name: 'Jamil',
        email: '',
        nickname: 'jamil',
        password: '123456'
    },
    {
        id: 3,
        name: 'Fábio',
        email: '',
        nickname: 'fabio',
        password: 'senha_forte123'
    }
];

export const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) {
        strength += 1;
    }
    if (password.match(/[a-z]+/)) {
        strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
        strength += 1;
    }
    if (password.match(/[0-9]+/)) {
        strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
        strength += 1;
    }
    return strength;
};

// Password strength test should be more than 3
const getUsersWithStrongPassword = (): User[] => {
    const usersWithStrongPassword = users.filter((user) => {
        return getPasswordStrength(user.password) > 3
    });
    return usersWithStrongPassword;
}