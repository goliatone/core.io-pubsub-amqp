'use strict';

var Persistence = require('./Persistence');

module.exports =  function $initPersistence(context, config){

    var _logger = context.getLogger('persistence');

    _logger.info('Persistence module booting...');

    if(!config.logger) config.logger = _logger;
    if(!config.dispatcher) config.dispatcher = context;

    var persistence = new Persistence(config);

    return new Promise(function(resolve, reject){
        /*
         * Start our ORM framework. We will
         * autoload models from models directory,
         * when ready, we'll get notified.
         */
        persistence.connect().then(function(orm){
            context.models = {};

            /*
             * Make all models available under
             * Model User will be available as:
             * context.models.user
             */
            context.models = persistence.collections;

            /*
             * Export using export name.
             * Model User will be available as:
             * context.models.User
             * Where User is User.exportName
             */
            persistence.export(persistence.collections, context.models);

            _logger.info('Persistence module ready.');
            // context.emit('persistence.ready');
            resolve(persistence);
        }).catch(function(err){
            _logError(err);
            reject(err);
        });
    });

    function _logError(err){
        _logger.error('---------------------');
        _logger.error('ORM ERR');
        _logger.error(err.message);
        _logger.error(err.stack);
        _logger.error('---------------------');
    }
};
