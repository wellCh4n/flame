var send = (res, isOk, message, data)=>{
    res.send(
        {
            'code': isOk? 1: -1,
            'message': message,
            'data': data
        }
    );
};

module.exports.send = send;