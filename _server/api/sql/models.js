import RedditScore from 'reddit-score';

import knex from './connector';

// A utility function that makes sure we always query the same columns
function addSelectToEntryQuery(query) {
    query.select('entries.*', knex.raw('coalesce(sum(votes.vote_value), 0) as score'))
        .leftJoin('votes', 'entries.id', 'votes.entry_id')
        .groupBy('entries.id');
}

// If we don't have a score, it is NULL by default
// Convert it to 0 on read.
function handleNullScoreInRow({score, ...rest}) {
    return {
        score: score || 0,
        ...rest,
    };
}

// Given a Knex query promise, resolve it and then format one or more rows
function formatRows(query) {
    return query.then((rows) => {
        if (rows.map) {
            return rows.map(handleNullScoreInRow);
        }
        return handleNullScoreInRow(rows);
    });
}


export class Users {
    getUsers(limit, offset) {
        const query = knex('users')
            .orderBy('created_at', 'desc');

        if (limit !== -1) {
            query.limit(limit).offset(offset);
        }

        return query.then(rows => (rows || []));
    }


    getUserById(id) {
        const query = knex('users')
            .where({id});
        return query.then(([row]) => row);
    }

    addUser(username, password) {
        return knex.transaction(trx => trx('users')
            .insert({
                username,
                password,
                created_at: new Date(Date.now()),
            })
            .returning('id'));
    }

    login(username, password) {
        return knex('users').where({username, password}).select('username')
            .then(() => {
                return knex.transaction(trx => trx('authTokens').insert({
                    username,
                    token: new Date(Date.now()),
                    created_at: new Date(Date.now())
                }).returning('token'))
            });
    }


    getTokens(id) {
        const query = knex('authTokens')
            .where({id});

        return query.then(([row]) => row);
    }
}
