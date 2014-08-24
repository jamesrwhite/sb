module.exports = function (start, count, cli) {
    var end = +new Date();
    var time_taken = (end - start) / 1000;

    // Clear the terminal
    process.stdout.write('\u001B[2J\u001B[0;0f');

    console.log('\n-------------------------');
    console.log(' Configuration');
    console.log('-------------------------');
    console.log(' Host:          ' + cli.host);
    console.log(' Port:          ' + cli.port);
    console.log(' Connections:   ' + cli.connections);
    console.log(' Concurrency:   ' + cli.concurrency);
    console.log('');

    console.log('-------------------------');
    console.log(' Results');
    console.log('-------------------------');
    console.log(' Time:          ' + time_taken + 's');
    console.log(' Queries:       ' + count);
    console.log(' Performance:   ' + Math.round((count / time_taken)) + ' p/s');
};
