import _ from 'lodash';
import RedditScore from 'reddit-score';

function countScore(score) {
    return (count, value) => count + (value === score ? 1 : 0);
}

function hot(repoVotes, date) {
    const redditScore = new RedditScore();

    const createdAt = date instanceof Date ? date : new Date(date);

    const scores = _.values(repoVotes || {});
    const ups = scores.reduce(countScore(1), 0);
    const downs = scores.reduce(countScore(-1), 0);

    return redditScore.hot(ups, downs, createdAt);
}

const users = [
    {username: 'Logi1', password: "123456"},
    {username: 'user2', password: "123456"},
];

export function seed(knex, Promise) {
    return Promise.all([
        knex('users').del(),
        knex('authTokens').del(),
    ])

    // Insert some entries for the repositories
        .then(() => {
            return Promise.all(users.map(({username, password}, i) => {
                const createdAt = new Date(Date.now() - (i * 10000));

                return knex('users').insert({
                    created_at: createdAt,
                    updated_at: createdAt,
                    username,
                    password,
                }).returning('id').then(([id]) => {
                });
            }));
        })
}
