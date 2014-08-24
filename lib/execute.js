var mysql = require('mysql');
var async = require('async');
var os = require('os');

// How many CPU's do we have?
var cpus = os.cpus().length;

module.exports = function (config, query, callback) {
    var tasks = [];

    // Create a connection pool to Sphinx
    var pool = mysql.createPool({
        host: config.host,
        port: config.port,
        connections: Math.round(config.connections / cpus),
    });

    // Push X queries onto the async queue where X is the level of concurrency
    for (var i = 0; i < config.concurrency; i++) {
        tasks.push(function(task_callback) {
            pool.getConnection(function(pool_error, connection) {
                if (pool_error) {
                    return task_callback(pool_error);
                }

                // Execute the Sphinx query
                connection.query(query, function(query_error) {
                    if (query_error) {
                        return task_callback(query_error);
                    }

                    task_callback(null, true);
                });

                // Release the connection back to the pool so it can be re-used
                connection.release();
            });
        });
    }

    // Execute all the tasks (queries) in parallel
    async.parallel(tasks, function(error, results) {
        if (error != null) {
            console.log('Error: ', error);
        }

        callback(results.length);
    });
};
