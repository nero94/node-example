/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */
let { EventEmitter } = require('events');

class ResponseMock extends EventEmitter {
    constructor() {
        super();
        this._headers = {};
        this._body = null;
        this._status = null;
        this._bodySent = false;
        this.headerSent = false;
    }

    get statusCode() {
        return this._status;
    }

    set statusCode(statusCode) {
        this._status = statusCode;
    }

    get body() {
        return this._body;
    }

    set body(body) {
        this._body = body;
    }

    _isFinished() {
        return this.headerSent && this._bodySent;
    }

    setHeader(name, value) {
        if (this.headerSent) {
            throw new Error("Can't set headers after they are sent.");
        }
        this._headers[name] = value;
    }

    getHeader(name) {
        return this._headers[name];
    }

    removeHeader(name) {
        delete this._headers[name];
    }

    writeHead(status, headers) {
        if (this.headerSent) {
            throw new Error("Can't render headers after they are sent to the client.");
        }
        this.headerSent = true;
        this._status = status;
        Object.assign(this._headers, headers);
    }

    write(content) {
        if (this._bodySent) {
            throw new Error("Can't write to already finished response.");
        }
        this._body = this._body ? this._body + content.toString() : content.toString();
    }

    end(content) {
        if (content) {
            this.write(content);
        }
        this._status || (this._status = 200);
        this._bodySent = true;
        this.emit('end');
    }

    status(code) {
        this._status = code;
        return this;
    }

    send(content) {
        this.end(content);
    }
}

class RequestMock extends EventEmitter {
    constructor(url, headers) {
        super();
        this.url = url;
        this.headers = headers || {};
    }

    getHeader(key) {
        return this.headers[key];
    }
}

module.exports = {
    RequestMock,
    ResponseMock,
};
