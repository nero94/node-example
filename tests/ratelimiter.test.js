const rateLimiter = require('../src/middlewares/ratelimiter');
const helper = require('./test-helper');
const mockFn = jest.fn();

describe('rateLimiter', () => {

    let req = null;
    let res = null;
    let next = jest.fn(() => { });

    beforeEach(() => {
        req = new helper.RequestMock('/batch', {
            host: 'example.com',
            method: 'POST',
            'content-type': 'application/json',
        });
        res = new helper.ResponseMock();
    });

    test('test rateLimiter', (done) => {
        const rl = rateLimiter(1, 1);
        rl(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
        rl(req, res, next);
        expect(res.statusCode).toBe(429);
        setTimeout(() => {
            rl(req, res, next);
            expect(next).toHaveBeenCalledTimes(2);
        }, 1000);
    });
});
