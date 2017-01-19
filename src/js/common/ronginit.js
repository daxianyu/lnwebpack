define(function () {
    //加载数据
    var _init = {
        init: function (token, callback, callbackList) {
            _init.initRongIMClient(token, callback, callbackList);
        },
        initRongIMClient: function (rong_token, callback, callbackList) {
            //连接融云
            RongIMLib.RongIMClient.init("pwe86ga5e64g6");
            //通过token建立连接
            console.log('token =' + rong_token);
            // 连接融云服务器。
            RongIMLib.RongIMClient.connect(rong_token, {
                onSuccess: function (userId) {

                    RongIMLib.RongIMEmoji.init();
                    //同步会话列表
                    RongIMLib.RongIMClient.getInstance().getConversationList({
                      onSuccess: function(list) {
                        // console.log(list);
                        if(callbackList){
                            callbackList(list)
                        }
                      },
                      onError: function(error) {
                         // do something...
                      }
                    },null);
                    console.log("Login successfully." + userId);
                },
                onTokenIncorrect: function () {
                    console.log('token无效');
                },
                onError: function (errorCode) {
                    var info = '';
                    switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = '未知错误';
                            break;
                        case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                            info = '不可接受的协议版本';
                            break;
                        case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                            info = 'appkey不正确';
                            break;
                        case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                            info = '服务器不可用';
                            break;
                    }
                    console.log(errorCode);
                }
            });
            // 设置连接监听状态 （ status 标识当前连接状态）
            // 连接状态监听器
            RongIMLib.RongIMClient.setConnectionStatusListener({
                onChanged: function (status) {
                    switch (status) {
                        //链接成功
                        case RongIMLib.ConnectionStatus.CONNECTED:
                            console.log('链接成功');
                            break;
                            //正在链接
                        case RongIMLib.ConnectionStatus.CONNECTING:
                            console.log('正在链接');
                            break;
                            //重新链接
                        case RongIMLib.ConnectionStatus.DISCONNECTED:
                            console.log('断开连接');
                            break;
                            //其他设备登陆
                        case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                            console.log('其他设备登陆');
                            break;
                            //网络不可用
                        case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                            console.log('网络不可用');
                            break;
                    }
                }
            });
            // 消息监听器
            RongIMLib.RongIMClient.setOnReceiveMessageListener({
                // 接收到的消息
                onReceived: function (message) {

                    // 判断消息类型
                    switch (message.messageType) {
                        case RongIMLib.RongIMClient.MessageType.TextMessage:
                            // 发送的消息内容将会被打印
                            
                            if(callback){
                                callback(message);
                            }
                            break;
                        case RongIMLib.RongIMClient.MessageType.VoiceMessage:
                            // 对声音进行预加载
                            // message.content.content 格式为 AMR 格式的 base64 码
                            RongIMLib.RongIMVoice.preLoaded(message.content.content);
                            break;
                        case RongIMLib.RongIMClient.MessageType.ImageMessage:
                            // do something...
                            break;
                        case RongIMLib.RongIMClient.MessageType.DiscussionNotificationMessage:
                            // do something...
                            break;
                        case RongIMLib.RongIMClient.MessageType.LocationMessage:
                            // do something...
                            break;
                        case RongIMLib.RongIMClient.MessageType.RichContentMessage:
                            // do something...
                            break;
                        case RongIMLib.RongIMClient.MessageType.DiscussionNotificationMessage:
                            // do something...
                            break;
                        case RongIMLib.RongIMClient.MessageType.InformationNotificationMessage:
                            // do something...
                            break;
                        case RongIMLib.RongIMClient.MessageType.ContactNotificationMessage:
                            // do something...
                            break;
                        case RongIMLib.RongIMClient.MessageType.ProfileNotificationMessage:
                            // do something...
                            break;
                        case RongIMLib.RongIMClient.MessageType.CommandNotificationMessage:
                            // do something...
                            break;
                        case RongIMLib.RongIMClient.MessageType.CommandMessage:
                            // do something...
                            break;
                        case RongIMLib.RongIMClient.MessageType.UnknownMessage:
                            // do something...
                            break;
                        default:
                            // 自定义消息
                            // do something...
                    }
                }
            });
            
        }
    };
    return {
        init: function (token, callback, callbackList) {
            require(['RongIMLib'], function () {
                _init.init(token, callback, callbackList);
            });
        }
    };

});

