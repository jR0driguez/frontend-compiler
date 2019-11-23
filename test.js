module.exports = (() => {
    console.log(1, require.main.filename);
    console.log(1, __filename);
});
