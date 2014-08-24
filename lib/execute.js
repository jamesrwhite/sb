var async = require('async');

module.exports = function (pool, query, count, concurrency, callback) {
    var tasks = [];

    // Push X queries onto the async queue where X is the level of concurrency
    for (var i = 0; i < concurrency; i++) {
        tasks.push(function(task_callback) {
            // Get a Sphinx connection from the pool
            pool.getConnection(function(pool_error, connection) {
                if (pool_error) {
                    task_callback(pool_error);
                }

                // Execute the Sphinx query
                connection.query(query, function(query_error) {
                    if (query_error) {
                        task_callback(query_error);
                    }

                    task_callback(null, true);
                });

                // Release the connection back to the pool so it can be re-used
                connection.release();
            });
        });
    }

    async.parallel(tasks, function(error, results) {
        if (error != null) {
            console.log('Error: ', error);
        }

        count += results.length;

        callback(count);
    });
};
