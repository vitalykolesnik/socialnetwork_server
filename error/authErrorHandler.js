const handleSubmitError = (err) => {
    let errors = { login: '', password: '', jwt: '' };

    if (err.message.includes('login not found')) {
        errors.login = 'that login is not registered';
    }

    if (err.message.includes('login already created')) {
        errors.login = 'login already created';
    }

    if (err.message.includes('incorrect login or password')) {
        errors.login = 'incorrect login or password';
        errors.password = 'incorrect login or password';
    }

    if (err.message.includes('incorrect jwt')) {
        errors.jwt = 'that jwt is incorrect';
    }

    if (err.message.includes('request failed with status code 403')) {
        errors.jwt = 'Request failed with status code 403';
    }

    if (
        err.message.includes('Validation error') ||
        err.name === 'SequelizeUniqueConstraintError'
    ) {
        Object.values(err.errors).forEach((prop) => {
            errors[prop.path] = prop.message;
        });
    }
    return errors;
};

module.exports = handleSubmitError;
