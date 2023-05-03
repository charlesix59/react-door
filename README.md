# React door
相信接触互联网比较早的各位一定使用过各种各样的门户网站，我依然记得当初的hao123网站恍如集市版
的排版布局。

我这个网站也致力于做一个门户网站，不过并不是曾今的那种门户。我*并不怀念*当初那个门户的时代，我
更喜欢使用极简的搜索引擎页或者new tab作为我的主页。这个网站真正的目的是：**做一个将日程
、搜索、todo与网站索引为一体的主页**。

这个网站其实专门为了自己个人使用，如果您觉得这个idea很有意思，欢迎您的fork与贡献。

## Demo

https://react-door.vercel.app/

## 思路
本来我是准备用BS架构，用SpringBoot写了一个后端，也就是此仓库的前几个提交。可惜后来我的服务器
到期了，续费又太贵，只能妥协。不过我还是考虑过使用vercel托管一个node或者Python的后端，不过
因为考虑到开源的话容易被攻击，因此没有事实。

直到我了解到indexDB这个技术，于是我立刻生出了开发一个数据库在前端的离线应用的想法。于是我花费
了一些时间，探索indexDB并且将数据库迁移到了前端，并删除了所有的ajax，采用前端的数据库交互。

这个工作实施起来其实还颇有难度，加上因为一些其他的事情耽搁，一直没有继续往后迭代。只断断续续的
完成了数据库的创建、加载与增添。目前算是比较闲的一段时间，打算尽可能的多实现一些功能。

## Next
这里是一些todo与历史清单

- [x] 1.0 前后端交互版本
- [x] 1.1 增加indexDB数据库
- [x] 1.2 实现indexDB数据的增加数据
- [x] 1.3 indexDB数据库的查找
- [x] 1.4 封装完成indexDB数据库操作
- [x] 1.5 完成每日任务、日程与代办事件的删除
- [x] 1.6 实现每日任务的修改与删除
- [x] 1.6.1 bug修复：修复每日任务完成会导致下一个每日任务被选中的问题(可以写一篇博客)
- [x] 1.6.2 UI美化：美化搜索框的样式
- [x] 1.6.3 数据：增加常用网站的数据
- [ ] 1.6.4 项目结构重构、规范模块化
- [ ] 1.6.5 搜索界面数据解耦
- [ ] 1.7 完成日程的修改
- [ ] more...