import SocketClient, { getUsers, getTopics } from './chat';

export function defineRouter(router) {
    router.route('/topics')
        .get(function (req, res) {
            const topics = getTopics();
            res.json(topics);
        });

    router.route('/topics/:topic/users')
        .get(function (req, res) {
            const topic = req.params.topic;
            const users = getUsers(topic);
            res.json(users);
        });
}

export function defineSockets(io) {
    io.on('connection', function (socket) {
        const client = new SocketClient(socket);
        client.listenLogin();
    });
}