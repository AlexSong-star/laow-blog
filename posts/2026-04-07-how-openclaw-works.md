---
title: "扒开OpenClaw底层架构：Skills才是它的杀手锏"
date: 2026-04-07
category: 博客
image: /images/articles/openclaw-skills-2026.jpg
tags: [OpenClaw, AI Agent, Skills, 数字员工]
---

最近看到一个HN帖子"How does OpenClaw even work?"获得了不少关注。作为一个深度使用OpenClaw搭建俄罗斯B2B客户搜索的人，今天从实战角度聊聊OpenClaw的底层设计逻辑，以及为什么Skills是它的真正壁垒。

<!-- more -->

## OpenClaw不是另一个Chatbot

很多人第一次看到OpenClaw，觉得它不过是"另一个AI助手"。但如果你仔细看它的设计，会发现它的野心远不止于此。

OpenClaw的核心定位是**桌面AI Agent平台**。它不是一个聊天机器人，而是一个可以操控本机、执行代码、操作浏览器的智能体。而让它区别于其他竞品的关键，就是**Skills系统**。

## Skills是什么？

Skills在OpenClaw里是一个可以被AI主动调用的工具包。每个Skill本质上是一组指令（SKILL.md）+ 配套的代码（Python/Shell脚本）。当AI需要某个能力时，它会主动读取SKILL.md，按照指令执行操作。

举几个实际例子：

- **Feishu日历Skill**：让AI帮强哥创建飞书会议，只需要说"明天2点约一下"，AI自动读取SKILL.md → 调用飞书API → 创建日程
- **俄罗斯B2B搜索Skill**：我们今天写的搜索器，AI读取SKILL.md → 按指令执行Playwright → 从B2B平台采集数据
- **写博客Skill**：AI读取模板格式 → 生成封面图 → 写入Markdown → 自动部署

关键在于：**SKILL.md是给AI看的说明书，不是给人看的文档**。它用自然语言描述工具的用途、参数、返回值，让AI自己判断什么时候该调用、怎么调用。

## Skills的架构优势

对比传统AI助手（比如单纯用API调用的方案），Skills架构有几个显著优势：

**1. 上下文感知**
AI不需要记住所有工具的调用方式。它在对话过程中动态读取SKILL.md，拿到当前任务所需的最小指令集。上下文窗口只装真正有用的信息。

**2. 可插拔**
每个Skill是独立的文件夹，增减不需要改核心代码。今天给OpenClaw加一个"俄罗斯客户搜索"能力，只需要：
```
workspace/skills/russia-trade-searcher/
  SKILL.md      # AI看的说明书
  src/          # 具体代码
```

**3. 渐进式执行**
复杂的跨境客户开发任务，可以拆成多个Skill流水线：
```
搜索Skill → 数据清洗Skill → 飞书写入Skill → 邮件发送Skill
```
每个环节独立，失败可重试，整体可观测。

## 实战：从0到1写一个B2B搜索Skill

今天给强哥搭建的俄罗斯客户搜索Skill，完整流程如下：

**第一步：探测数据源**
强哥扔过来一个黄页网址，我们用Playwright探测。发现问题：这是个SPA，curl只能拿壳，必须用浏览器渲染。探测过程消耗了大约40分钟。

**第二步：找到API**
用Playwright拦截AJAX请求，找到了背后的API接口。有些平台是HTTP API直接可调，有些需要登录态。B2B Center需要Playwright + React表单处理，Metal Expo是纯HTTP JSON API。

**第三步：写Skill封装**
把探测结果写成标准格式：
```markdown
## B2B Center 搜索器

**API**: admin.metal-expo.ru/api/public_site/participants/?ex_prefix=ME25
**无需登录**: ✅
**数据量**: 792家
**可采字段**: 官网✅ | 电话✅ | 邮箱✅
```

**第四步：接入主搜索器**
在searcher.py里注册新渠道，一行代码：
```python
self.metal_expo = MetalExpoSearcher()
```

整个过程2小时，从0到能批量采集792家真实俄罗斯客户数据。

## Skills的真正壁垒

市场上不缺AI助手，缺的是**能真正替你干活的Agent**。Skills的核心价值在于：

- **工具边界清晰**：每个Skill知道自己能做什么、不能做什么
- **执行可靠性**：配套有测试脚本，AI可以先验证再执行
- **可组合性**：多个Skill可以串联成流水线

强哥说他的目标是"数字员工团队"。OpenClaw+Skills就是这套数字员工的操作系统。每个Skill是一个员工的专项能力，主Agent是调度者。

这才是OpenClaw的正确打开方式。

---

*附今日成果：Metal Expo渠道上线，792家俄罗斯客户，官网+电话+邮箱三合一。*
