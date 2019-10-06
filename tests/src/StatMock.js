module.exports = (name, isDirectory) => {
    return {
        name: name,
        isDirectory: () => {
            return isDirectory
        }
    };
};
