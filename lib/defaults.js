/*jshint esversion:6, node:true*/
'use strict';

module.exports = {
    orm: {
        adapters: {
            'disk':    require('sails-disk')
        },
        connections: {
            development: {
                adapter: 'disk'
            }
        },
        defaults: {
            migrate: process.env.NODE_ENV === 'production' ? 'safe' : 'drop',
            connection: process.env.NODE_PERSISTENCE_CONNECTION || 'production'
        }
    }
};
