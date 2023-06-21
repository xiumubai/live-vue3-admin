import { createServer } from 'http'
import { Server } from 'socket.io'
const connectList = ['']

const testRoomList = []

const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    //解决跨域问题
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
let numUsers = 0
connectList.length = 0
testRoomList.length = 0
io.on('connection', (socket) => {
  // ...
  console.log('cconnection---->' + socket.id)

  socket.on('disconnect', () => {
    // ...
    console.log('断开连接---->')
    let index = connectList.indexOf(socket.id)
    connectList.splice(index, index + 1)

    let index1 = testRoomList.indexOf(socket.id)
    connectList.splice(index1, index1 + 1)
  })
  // 收到消息 ， 参数就是前端传过来了， 1,2,3 这样排列，回调函数可以放在任意位置， cb 消息
  socket.on('my_event', (res) => {
    console.log('收到消息', res)
  })
  socket.on('leave', (arg) => {
    // console.log(`socket ${arg.id} has leave room ${arg.room}`);
    console.log('leave-room    --->' + arg) // world
    socket.leave(arg)
    io.to(arg).emit(
      'leavecall',
      `socket ${socket.username} 离开了房间： ${arg}`,
    )
  })

  socket.on('hello', (arg) => {
    console.log('on  hello    --->' + arg) // world
    socket.emit('server-back', {
      message: 'server give you a msg',
    })
  })

  // when the client emits 'add user', this listens and executes
  socket.on('do login', (user_name) => {
    let index = connectList.indexOf(socket.id)
    console.log('index---->' + index)
    if (index > -1) {
      let str = user_name + '已经登录---->'
      console.log(str)
      socket.emit('login', {
        isLogin: true,
        numUsers: numUsers,
        username: user_name,
        message: str,
      })
    } else {
      console.log('登陆成功---->')
      connectList.push(socket.id)
      socket.username = user_name
      ++numUsers
      socket.emit('login', {
        isLogin: true,
        numUsers: numUsers,
        username: user_name,
        message: '登陆成功',
      })
    }
  })

  // when the client emits 'add user', this listens and executes
  socket.on('join test room', (user_name) => {
    socket.username = user_name
    let index = testRoomList.indexOf(socket.id)
    console.log('index---->' + index)
    if (index > -1) {
      let str = user_name + '已经加入房间---->'
      console.log(str)
      socket.emit('user joined', str)
    } else {
      let str = '欢迎 ' + user_name + '加入---->'
      console.log(str)
      testRoomList.push(socket.id)
      socket.join('testroom')
      io.to('testroom').emit('user joined', str)
      if (user_name === '王二麻子') {
        socket.join('test1')
        socket.join('test12')
      } else {
        socket.join('test3')
        socket.join('test4')
      }
    }
  })

  socket.on('obj message', (arg, callback) => {
    console.log('obj message    --->' + JSON.stringify(arg)) // world
    callback('1111111111111111111111111111111')
  })
  socket.on('obj callback', (arg, callback) => {
    console.log('obj callback    --->' + JSON.stringify(arg)) // world
    callback({
      name: 'server',
      data: 'with params callback',
    })
  })

  socket.on('new message', (arg) => {
    console.log('new message    --->' + JSON.stringify(arg)) // world
    socket.emit('new message', {
      username: socket.username,
      message: arg + '的服务器回复',
    })
    if (testRoomList.length > 1) {
      socket
        .to(testRoomList[0])
        .emit('private message', socket.username, arg + '的服务器回复')
    }
  })
  socket.on('get message', (arg, callback) => {
    console.log('get message    --->' + arg) // world
    // io.to("testroom").emit("msg", {
    //   message: arg + "的服务器回复"
    // });
    callback(arg + '的服务器回复')
  })

  socket.emit('send', 1, '2', { 3: '4', 5: Buffer.from([6]) })

  io.sockets.emit('broadcast', {
    message: 'this is a broadcast msg',
  })
  socket.on('compress', (arg) => {
    console.log('compress    --->' + arg) // world
    socket.compress(true).emit('compress', 'this is a compress msg')
  })
  socket.on('my-event', (arg, callback) => {
    console.log('my-event    --->' + arg) // world
    setTimeout(() => {
      callback({
        message: 'this is a timeout msg',
      })
    }, 1000)
    // socket.emit('my-event-back','this is a timeout msg')
  })
  socket.on('update item', (arg1, arg2, callback) => {
    console.log(arg1) // 1
    console.log(arg2) // { name: "updated" }
    callback({
      status: 'ok',
    })
  })

  io.local.emit('localmsg', {
    message: 'this is local msg',
  })
  socket.emit('new message', '测试删除所以')

  socket.emit('msg', '测试单独string回复')
  setTimeout(() => {
    socket.emit('connect_msg', { msg: '发送消息给客户端111' })
  }, 20000)
})

httpServer.listen(23456, function () {
  console.log('client listening.....')
})
