var async = require('async');

module.exports = function (pool, config, query, callback) {
    var tasks = [];

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
