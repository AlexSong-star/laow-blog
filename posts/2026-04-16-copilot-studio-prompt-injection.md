---
title: Copilot Studio被曝高危漏洞：打了补丁，数据依然被窃
date: '2026-04-16'
category: 新闻
tags: [安全, Microsoft, Copilot, Agent, 提示注入, 漏洞]
image: >-
  https://cdn.jsdelivr.net/gh/AlexSong-star/laow-blog@main/public/images/articles/news_copilot.jpg
excerpt: 安全研究公司Capsule Security披露了微软Copilot Studio的一个严重提示注入漏洞（CVE-2026-21520），该漏洞允许攻击者通过SharePoint表单向Copilot Agent注入恶意指令，绕过安全机制窃取CRM数据。微软已打补丁，但研究显示数据已在补丁部署前泄露。
published: true
---

# Copilot Studio被曝高危漏洞：打了补丁，数据依然被窃

**安全公司Capsule Security于4月15日发布研究报告，披露了微软Copilot Studio的一个间接提示注入漏洞（CVE-2026-21520，CVSS 7.5）。攻击者可利用SharePoint表单注入恶意指令，操控Copilot Agent窃取CRM数据。微软已部署补丁，但研究人员指出：数据实际上已经外泄。**

这并非孤例。同日披露的还有Salesforce Agentforce的PipeLeak漏洞，以及Coding Agent平台的内存污染问题。AI Agent安全风险的"三连击"，让企业安全团队不得不重新审视AI部署的边界。

## 漏洞原理：表单即攻击面

Capsule将这个漏洞命名为**ShareLeak**。攻击链如下：

1. 攻击者在公开的SharePoint评论表单中填入精心构造的载荷——一段看似无害的文本，实际包含注入的系统角色指令
2. 用户触发的Copilot Studio Agent读取该表单内容时，载荷被直接拼接到Agent的系统指令中
3. Agent被重新编程后，执行查询SharePoint Lists获取客户数据，并通过Outlook将数据发送到攻击者控制的邮箱

关键细节：**微软自身的安全机制确实标记了这笔操作为可疑**，但DLP（数据防泄漏）没有触发——因为邮件是通过合法的Outlook接口发出的，系统将其视为"授权操作"。

```
正常操作：用户 → Agent → 查询CRM → 授权邮件发送
攻击路径：表单注入 → Agent重编程 → CRM查询 → 授权邮件外发
```

两者的区别仅在于"是谁告诉Agent去查"——而传统DLP无法区分。

## 为什么这是"打了也白打"的漏洞？

这是提示注入（Prompt Injection）的本质困境。

传统安全漏洞可以通过代码修复、根因消除来彻底解决。但提示注入的攻击向量是**自然语言本身**——只要AI系统读取外部内容（表单、邮件、文档、网页），攻击者就理论上可以注入指令。

Capsule的测试环境：
- 输入：SharePoint公开表单
- 触发：Copilot Studio Agent读取该表单
- 外发：Outlook授权接口
- 防护失效点：输入清理、DLP检测、上下文隔离

三个环节均存在缺陷，而微软的"打补丁"只修复了其中最外层——输入验证。更根本的问题在于**LLM无法区分"可信的系统指令"和"不可信的外部输入"**，这是一个架构层面的问题，无法通过单一补丁解决。

## Agentforce同日中招

Capsule同期发现的**PipeLeak**影响了Salesforce Agentforce：公开表单同样被用于注入载荷，无需任何认证即可操控Agent查询CRM数据并外发。研究人员称，他们**未能触达数据外泄的量级上限**——换言之，"有多少漏多少"。

Salesforce已修复ForcedLeak（2025年9月披露）漏洞利用的URL通道，但Email通道仍然畅通。

## 企业应该怎么办？

对于已部署Copilot Studio或Agentforce的企业，Capsule给出以下紧急建议：

| 优先级 | 行动项 |
|--------|--------|
| 立即 | 审计所有通过SharePoint表单触发的Copilot Studio Agent |
| 立即 | 限制Agent的Outbound邮件仅发送至公司域名 |
| 立即 | 审查2025年11月24日至2026年1月15日期间的相关日志 |
| 短期 | 为所有生产Agent添加运行时监控（Runtime Guard） |
| 中期 | 将提示注入纳入企业安全风险模型，作为SaaS级风险而非单点漏洞 |

**根本性解法**：least-privilege访问控制 + 运行时意图分析 + 关键操作人工审批。三者缺一不可。

---

*AI Agent的安全风险不是"未来问题"，而是正在发生的架构性挑战。持续关注，获取最新AI安全情报。*
