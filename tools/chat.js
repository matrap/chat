/* eslint-disable no-console */

export const LOGIN_TOPIC = 'login';
export const LOGOUT_TOPIC = 'logout';

let clients = [];
let topics = ['Default', 'Family'];

export function getUsers(topic) {
    const topicClients = clients.filter(c => c.topics.includes(topic));
    const users = topicClients.map(c => c.user);
    return users;
}

export function getTopics() {
    return topics;
}

function publishOnTopic(topic, msg) {
    const topicClients = clients.filter(c => c.topics.includes(topic));
    topicClients.forEach(c => c.publish(topic, msg));
}

function publishLogin(topic, user) {
    const topicClients = clients.filter(c => c.topics.includes(topic));
    const msg = {topic: topic, user: user };
    topicClients.forEach(c => c.publish(LOGIN_TOPIC, msg));
}

function publishLogout(topic, user) {
    const topicClients = clients.filter(c => c.topics.includes(topic));
    const msg = {topic: topic, user: user };
    topicClients.forEach(c => c.publish(LOGOUT_TOPIC, msg));   
}

export default class SocketClient {
    constructor(socket) {
        this.socket = socket;
        this.user = { id: socket.id, nickname: null };
        this.topics = [];

        this.disconnect = this.disconnect.bind(this);
        this.publish = this.publish.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.listenLogin = this.listenLogin.bind(this);

        clients.push(this);
        this.socket.on('disconnect', this.disconnect);
        console.log(`a user ${this.user.id} connected`);
    }

    login(topic) {
        this.topics.push(topic);
        const self = this;
        this.socket.on(topic, function (text) {
            const msg = {
                author: self.user,
                text: text
            };
            publishOnTopic(topic, msg);
        });
        publishLogin(topic, this.user );
    }

    logout(topic) {
        this.socket.removeAllListeners(topic);
        const topicIndex = this.topics.findIndex(t => t == topic);
        this.topics.splice(topicIndex, 1);
        publishLogout(topic, this.user);
        this.listenLogin();
    }    

    publish(topic, msg) {
        this.socket.emit(topic, msg);
    }

    listenLogin() {
        const self = this;
        this.socket.once(LOGIN_TOPIC, function(msg) {
            self.user.nickname = msg.nickname;
            self.socket.once(LOGOUT_TOPIC, function(msg) {
                self.logout(msg.topic);
            });
            self.login(msg.topic);
        });
    }

    disconnect() {
        this.topics.forEach(t => this.logout(t));

        const index = clients.findIndex(c => c == this);
        clients.splice(index, 1);

        console.log(`user ${this.user.id} disconnected`);
    }
}