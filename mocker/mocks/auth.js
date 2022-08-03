const Mockjs = require('mockjs')
const Jwt = require('jsonwebtoken')

const user = {
  id: "123",
  name: '吴浩',
  no: 'admin',
  password: 'admin'
}

module.exports = {
  '[POST] /api/user/login': ctx => {
    console.log(ctx.request.params, ctx.request.body, ctx.request.query)
    const { username, password } = ctx.request.body
    if (username !== user.no || password !== user.password) {
      ctx.body = {
        code: 500,
        msg: '账号或密码错误',
        data: null
      }
      return
    }
    ctx.body = {
      code: 200,
      msg: '操作成功',
      data: {
        user_id: user.id,
        access_token: Jwt.sign(user, 'secret', { expiresIn: '2h' })
      }
    }
  },
  // 获取用户信息
  '[get] /api/user/token': ctx => {
    const headers = ctx.request.headers
    if (!headers.authorization) {
      ctx.body = {
        code: 401,
        msg: '未授权'
      }
    } else {
      ctx.body = {
        code: 200,
        msg: '操作成功',
        data: user
      }
    }
  },
  // 获取菜单信息
  '[get] /api/user/menus': ctx => {
    ctx.body = {
      code: 200,
      msg: '操作成功',
      data: [
      {
        "code": "homepage",
        "icon": "home",
        "id": "hatech-web-code-homepage",
        "isDelete": null,
        "isShow": 1,
        "level": 3,
        "menuName": "首页",
        "orderInfo": 0,
        "path": "/home",
        "systemFlag": null,
        "template": "main",
        children: []
      },
      {
        "code": "app",
        "icon": "home",
        "id": "hatech-web-code-app",
        "isDelete": null,
        "isShow": 1,
        "level": 3,
        "menuName": "应用管理",
        "orderInfo": 0,
        "path": "/apps",
        "systemFlag": null,
        "template": "main",
        children: [
          {
            "code": "app-list",
            "icon": "home",
            "id": "hatech-web-code-app-list",
            "isDelete": null,
            "isShow": 1,
            "level": 4,
            "menuName": "应用列表",
            "orderInfo": 0,
            "path": "/apps/list",
            "systemFlag": null,
            "template": "main",
          },
          {
            "code": "app-config",
            "icon": "home",
            "id": "hatech-web-code-app-config",
            "isDelete": null,
            "isShow": 1,
            "level": 4,
            "menuName": "配置页面",
            "orderInfo": 0,
            "path": "/apps/config",
            "systemFlag": null,
            "template": "main",
          }
        ]
      },
      ]
    }
  },
  // 获取菜单鉴权信息
  '[get] /api/menu/auth': ctx => {
    const data = []
    ctx.body = {
      code: 200,
      msg: '操作成功',
      data
    }
  }
}
