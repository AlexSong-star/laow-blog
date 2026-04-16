---
title: "OpenAI Codex桌面版超级更新：AI Agent操控电脑上所有应用"
date: "2026-04-17"
category: "新闻"
tags: ["OpenAI", "Codex", "AI Agent", "桌面应用"]
excerpt: "OpenAI发布Codex桌面版重大更新，新增计算机使用、GPT图像生成和内置浏览器。支持AI同时操控Mac/Windows上的所有应用程序，3百万周活开发者。"
image: "https://cdn.jsdelivr.net/gh/AlexSong-star/laow-blog@main/public/images/articles/openai-codex-desktop-super-update.jpg"
published: true
---

# OpenAI Codex桌面版超级更新：AI Agent操控电脑上所有应用

OpenAI在4月16日宣布Codex桌面版（Mac和Windows）重大升级，将其推向"Super App"愿景——AI Agent可以访问并操控电脑上的所有应用程序，无需切换窗口即可在后台并行工作。

## 核心功能：后台计算机使用（macOS限定）

本次最大技术飞跃是**"Computer Use"**——Codex可以"看见、点击、在所有应用程序中输入"，且这一切都发生在**后台**。

```python
# Codex现在可以做这样的事：
# 用户输入："帮我检查Slack、Gmail、Google Calendar和Notion，
#           告诉我哪些需要我注意"
# Codex → 扫描所有4个应用 → 汇总优先级 → 主动推送给你
```

用户可以继续手动使用电脑，同时Codex在后台处理其他任务。这实现了"多Agent工作流"——比如Codex同时测试前端更改或分类JIRA工单，用户自己在另一个应用程序中工作。

## 90+新插件：连接整个开发工具链

Codex现在集成了超过**90个新插件**，包括：
- CircleCI、GitLab
- Microsoft Suite（完整集成）
- GitHub PR管理
- 远程基础设施管理

开发者可以在Codex中完成从GitHub PR审查到管理远程开发环境的一切操作，而无需切换到单独的终端窗口。

## 内置浏览器 + GPT图像生成

另外两个重大功能：

1. **内置Web浏览器**：开发者可直接在Codex中预览前端开发，直接在DOM元素上评论，提供精确的Agent指令

2. **GPT Image 1.5集成**：Codex内部管线直连GPT Image 1.5，可以为网站、演示文稿、全资产PC游戏生成图像——风格完全一致

## 记忆 + 心跳自动化

新引入的持久化Agency特性：

- **"Heartbeat Automations"**：Codex可以调度未来工作，"唤醒"并继续长期任务
- **Memory（记忆）**：Codex记住个人偏好、之前的修正和收集的信息，减少每次新会话的冗余指令
- **每日简报**：类似Anthropic Claude Code的"Routines"功能，识别待处理的Google Doc评论或相关Slack上下文

## 3百万周活开发者

OpenAI同时确认：Codex已有**300万周活开发者**，印证了其作为最主流AI编程工具的地位。

## 定价与可用性

核心Codex桌面应用已在Mac和Windows上线。以下功能分层：

| 功能 | 覆盖 |
|------|------|
| 后台计算机使用 | 仅macOS |
| 个性化（Memory/Suggestions） | 即将上线（Enterprise、Edu、EU、UK） |
| SDLC核心更新 | 全部桌面用户 |

价格方面，OpenAI最近转向更灵活的团队定价模式，包括$100计划（ChatGPT Pro）和即用即付选项。

## "我们在Codex中构建Super App"

当被问及这些功能是否代表AI"Super App"的基础时，OpenAI Codex负责人Tibo Sottiaux确认：

> "我们正在开放中构建Super App，并从Codex应用中演进它。"

这是OpenAI的明确宣言：当Anthropic专注模型能力、 Google专注搜索集成时，OpenAI选择了**应用层**作为主战场。
