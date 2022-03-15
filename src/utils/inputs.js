const inputs = [
    {
        id: 1,
        title: 'Tài khoản',
        type: 'text',
        name: 'email',
        placeholder: 'Email',
        errorMessage: 'Email không hợp lệ',
        pattern: '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})',
        required: true,
    },
    {
        id: 2,
        title: 'Mật khẩu',
        type: 'password',
        name: 'password',
        placeholder: 'Password',
        errorMessage: 'Mật khẩu gồm có ít nhất 6 ký tự',
        pattern: "^[A-Za-z0-9]{6,12}$",
        required: true,
        autoComplete: 'off'
    },

]

export default inputs