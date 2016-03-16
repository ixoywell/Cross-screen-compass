#跨屏指南针
====

## 介绍

跨屏指南针是通过nodejs+socket.io跨屏同步显示指南针数据角度，原理是通过手机deviceorientationAPI接口获取elpha方法获得方向数据，通过socket.io传输数据到其他屏幕上
----

## 使用

```
git clone https://github.com/ixoywell/Cross-screen-compass.git
cd Cross-screen-compass
npm install
node -app.js
```

运行`node -app.js`命令，会启动node程序，并且默认会在`3000`端口启动服务器（例如:192.168.1.180），然后在浏览器打开 `http://localhost:3000`, 同时在手机端（同一网段）打开，打开所在服务器的ip的3000端口（例如：192.168.1.180：3000）。