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
    res.send({
        'code': 1,
        'message': '执行成功',
        'data': data
    })
};

var sendError = (res, err) => {
    res.send({
        'code': -1,
        'message': '执行失败',
        'error': err
    })
}

module.exports = {
    send,
    sendSuccess,
    sendError
};