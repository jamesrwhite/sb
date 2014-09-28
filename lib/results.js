module.exports = function (start, count, config) {
    var end = +new Date();
    var time_taken = (end - start) / 1000;

    // Clear the terminal
    process.stdout.write('\u001B[2J\u001B[0;0f');

    console.log('\n-------------------------');
    console.log(' Configuration');
    console.log('-------------------------');
    console.log(' Host:          ' + config.host);
    console.log(' Port:          ' + config.port);
    console.log(' Workers:       ' + config.cpus);
    console.log(' Connections:   ' + config.connections);
    console.log(' Concurrency:   ' + config.concurrency);
    console.log('');

    console.log('-------------------------');
    console.log(' Results');
    console.log('-------------------------');
    console.log(' Time:          ' + time_taken + 's');
    console.log(' Queries:       ' + count);
    console.log(' Performance:   ' + Math.round((count / time_taken)) + ' p/s');
};
