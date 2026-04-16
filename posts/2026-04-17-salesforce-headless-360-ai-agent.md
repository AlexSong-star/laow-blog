---
title: "Salesforce发布Headless 360：把整个平台变成AI Agent的基础设施"
date: "2026-04-17"
category: "新闻"
tags: ["AI Agent", "Salesforce", "MCP", "企业AI"]
excerpt: "Salesforce在TDX 2026大会上发布了史上最重大的架构转型——Headless 360，将整个平台暴露为API、MCP工具和CLI命令，让AI Agent无需打开浏览器就能操控整个Salesforce系统。"
image: "https://cdn.jsdelivr.net/gh/AlexSong-star/laow-blog@main/public/images/articles/salesforce-headless-360-ai-agent.jpg"
published: true
---

# Salesforce发布Headless 360：把整个平台变成AI Agent的基础设施

在4月16日举行的TDX 2026大会上，Salesforce发布了有史以来最重大的架构转型——**Headless 360**。这一举措将Salesforce 27年积累的全部能力，转化为AI Agent可以直接调用的API、MCP工具和CLI命令。

## 100+新工具：Agent编写代码能力首次完整开放

Headless 360的**第一支柱**是"任意方式构建"，一次性推出：
- **60+个新MCP工具**：让外部编码Agent（如Claude Code、Cursor、Windsurf）完全访问客户整个Salesforce org，包括数据、工作流和业务逻辑
- **30+预配置编码技能**：开发者不再需要在Salesforce自有IDE中工作，可以从任何终端指挥AI编码Agent完成构建、部署和管理
- **Agentforce Vibes 2.0**：支持Anthropic Agent SDK和OpenAI Agents SDK的"开放Agent工具箱"，可动态切换Claude Code和OpenAI Agent

同时引入**原生React支持**，突破了Salesforce自有Lightning框架的限制——开发者可以用React构建完全自定义的前端界面，通过GraphQL连接org元数据，同时继承所有平台安全机制。

## Agent Script：把AI Agent行为写成确定性代码

本次发布的最大技术亮点是**Agent Script**，这是一种新的领域特定语言（DSL），将确定性编程与LLM的概率灵活性结合。它以单一平面文件形式定义状态机——可版本控制、可审计——governing AI Agent的行为。

```python
# Agent Script示例（伪代码）
state_machine: order_processing
  when status == "new":
    verify_inventory()
    if available:
      confirm_order()
      notify_customer()
    else:
      escalate_to_human()
```

Salesforce同时宣布**Agent Script开源**，并预告Claude Code已能原生生成Agent Script代码。

## 两种Agent架构：客户面向 vs 员工面向

Salesforce EVP Jayesh Govindarjan提出了企业AI的**两种对立架构**：

1. **客户面向Agent**（静态图）：通过严格确定性控制，在将Agent放到客户面前之前，企业必须遵循特定的品牌规则范式。Agent Script将这些编码为静态图——明确的漏斗步骤，LLM推理嵌入每个步骤内。

2. **"Ralph Wiggum循环"**（动态图）：员工面向场景的动态图，在运行时展开，Agent根据上一步学到的东西自主决定下一步——杀死的死路径，生成新的路径，直到任务完成。开发者用编码Agent、销售人员跑深度研究循环、市场人员生成营销素材——专家人类在输出发布前审查。

关键洞察：两种架构运行在相同底层平台和图引擎上。"这是一个动态图。这是一个静态图。底层都是图。"

## 从每座位计费到消耗计费

Salesforce商业模式也在转变——从per-seat许可转向Agentforce的消耗计费。Govindarjan称之为"我们自己的商业模式创新"——当Agent而非人类在工作时，按用户数收费已经不再合理。

## 为什么这很重要

Salesforce的赌注很明确：随着AI Agent能够从零开始构建新系统，传统企业软件的"护城河"正在被侵蚀。Headless 360的回答是：不是防守旧模式——而是**拆掉整个平台，邀请所有Agent走进来**。

每一个能够替代CRM的编码Agent，现在通过Headless 360，成为构建在CRM之上的编码Agent。

> "你应该永远不再登录Salesforce了？" —— Salesforce联合创始人Parker Harris

如果Headless 360按设计运行，答案是：你不需要。但这，Salesforce赌注，恰恰是让你继续付费的原因。
