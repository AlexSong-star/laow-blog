---
title: 震惊！Google封杀真正能「操控手机」的AI助手，Sova AI被迫自己托管APK
date: '2026-04-07'
category: 新闻
image: /images/articles/sova_ai_banned.png
tags:
  - AI助手
  - Android
  - AI Agent
  - Google
  - 移动AI
---

# 震惊！Google封杀真正能「操控手机」的AI助手，Sova AI被迫自己托管APK

**2026年4月2日，HN热帖**

一则帖子在Hacker News炸开了锅：开发者兄弟档打造的**Sova AI**——一款真正能替你操作Android手机的AI Agent，被Google Play以「违反政策」为由直接封杀下架。

## 它做了什么Gemini做不到的事？

用过手机AI助手的人都懂这个痛点：问Gemini「帮我叫个Uber去机场」或「给朋友发条Telegram说我要迟到了」，它只会返回一串网页搜索结果，或者一个「打开App」的按钮——**永远不会替你完成任务**。

Sova AI做到了真正意义的手机操控：

- **无需Root、无需ADB、无需PC**
- **无需Appium等测试框架**
- **无需USB连接或Shizuku等变通方案**
- 纯粹依靠Android原生**无障碍API（Accessibility API）**读取屏幕UI节点树，然后像真人一样点击、滚动、输入

用户只需要说一句话（语音或文字），AI就会自己打开对应App、完成操作、完全代劳。

## Google的理由：Accessibility API不能用于「通用自动化」

讽刺的是：Google封杀Sova AI的理由，恰恰是它实现了Gemini承诺但从未兑现的「Agent能力」。Google认为，通过无障碍API操作其他应用属于「通用自动化」，违反Play商店政策。

Sova团队选择**不再申诉，直接自建分发渠道**——APK托管在自己的服务器上：https://sova.ayconic.io

## 技术难点：LMT输出→精准坐标才是噩梦

开发者透露，最难的不是「操控手机」这个概念，而是：

> 将LLM的输出转化为** thousands of different device resolutions**（数千种不同设备分辨率）上的精准X/Y坐标。

每台Android手机的屏幕尺寸、分辨率、DPI都不同，AI模型输出的点击坐标必须精确映射到当前设备，才能真正工作。这是个尚未被解决的工程难题，Sova目前也还没做到100%完美。

## 支持所有主流模型：OpenAI、Claude、Gemini、Deepseek均可

Sova AI采用**BYOK（Bring Your Own Key）**模式：

- 引擎本身**完全免费**
- 用户插入自己的API Key（OpenAI / Claude / Gemini / Deepseek等）
- 只向模型提供商支付Token费用

此外还在推进Ollama、LM Studio等本地模型支持，未来可完全在设备本地运行。

## 路线图：iOS版本、企业级支持

- ✅ Android端侧支持
- 🔄 Ollama / LM Studio本地模型
- 🔄 预定义规则和任务人格（Personas）
- 🔄 详细使用统计
- 🔄 OpenRouter / AWS Bedrock / Google Vertex / Azure Foundry
- 📱 iOS版本（路线图中）

## 一句话总结

**Google用「安全」的理由封杀了一款真正在做手机Agent的应用，而Gemini自己却连「发条消息」都做不到。** 这背后是平台管控与真正AI Agent创新之间的深层矛盾——Sova团队选择自己托管APK，用脚投票。

> 视频演示：https://www.youtube.com/watch?v=r-x6hRmtBy0
> APK下载：https://sova.ayconic.io
