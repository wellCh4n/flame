const successCode = 1;
const successMessage = '执行成功';

var returnBody = {
    'code': -1,
    'message': '执行失败',
    'data': ''
}

var send = (res, isOk, message, data) => {
    res.send(
        {
            'code': isOk ? 1 : -1,
            'message': message,
            'data': data
        }
    );
};

var sendSuccess = (res, data) => {
    returnBody.code = successCode;
    returnBody.message = successMessage;
    if (arguments.length == 1) {
        returnBody.data == null;
    }
    returnBody.data = data;
    res.send(returnBody);
};

var sendError = (res, err) => {
    returnBody.message = err;
    res.send(returnBody);
};

module.exports = {
    send,
    sendSuccess,
    sendError
};