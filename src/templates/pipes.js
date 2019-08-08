function decapitalize(value) {
    if (!value) {
        return "";
    }

    if (value.length > 1) {
        return value.substr(0, 1).toLowerCase() + value.substr(1, value.length);
    }

    return value.toLowerCase();
}

function capitalize(value) {
    if (!value) {
        return "";
    }

    if (value.length > 1) {
        return value.substr(0, 1).toUpperCase() + value.substr(1, value.length);
    }

    return value.toUpperCase();
}

module.exports = {
    capitalize: value => capitalize(value),
    decapitalize: value => decapitalize(value)
};
