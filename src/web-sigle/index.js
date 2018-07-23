require('./assets/scss/reset.scss');
const foo = async function () {
    let fun = await require('require-remote')('https://gist.githubusercontent.com/webkong/fe88573898a3a2957c06b65a04304cac/raw/f535a2a82f8d820125fae5ec9fb3380375a3a5a0/anyTotime.js')
    return fun;
}
console.log(foo)