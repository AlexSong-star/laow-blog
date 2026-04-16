---
title: "Anthropic发布Claude Opus 4.7：夺回最强通用LLM王座"
date: "2026-04-17"
category: "新闻"
tags: ["Anthropic", "Claude", "LLM", "AI Agent"]
excerpt: "Anthropic发布Claude Opus 4.7，在关键基准上超越GPT-5.4和Gemini 3.1 Pro，重新夺回最强通用LLM桂冠。同时公司估值已达$8000亿，年化收入$300亿。"
image: "https://cdn.jsdelivr.net/gh/AlexSong-star/laow-blog@main/public/images/articles/anthropic-claude-opus-4-7-llm.jpg"
published: true
---

# Anthropic发布Claude Opus 4.7：夺回最强通用LLM王座

4月16日，Anthropic正式发布**Claude Opus 4.7**——其迄今为止最强大的大型语言模型，在关键基准上超越OpenAI GPT-5.4和Google Gemini 3.1 Pro，重新夺回最强通用LLM的王座。

## 基准测试：与GPT-5.4的7:4胜负

Claude Opus 4.7最直接的竞争来自GPT-5.4（3月初发布）和Gemini 3.1 Pro（2月发布）。在直接可比的基准测试中：

| 基准 | Opus 4.7 | GPT-5.4 | Gemini 3.1 Pro |
|------|----------|---------|----------------|
| **GDPVal-AA知识工作** | **1753** | 1674 | 1314 |
| **SWE-bench Pro编程** | **64.3%** | 53.4% | — |
| **GPQA Diamond研究生推理** | **94.2%** | ~93% | — |
| **Visual Reasoning (arXiv)** | **91.0%** | 84.7% | — |

但竞争仍然胶着：GPT-5.4在Agentic Search（89.3% vs 79.3%）和多语言问答上仍领先。

## 核心升级："自验证"能力

Opus 4.7最大的架构改进是**自我验证能力**——在报告任务完成前，模型会自主构建验证步骤。

Anthropic将此描述为"rigor"（严谨性）：模型不再只是生成答案，而是创建内部测试来验证答案是否正确。

在内部测试中，模型曾从零构建Rust文本转语音引擎，然后独立将生成的音频通过独立的语音识别器验证，与Python参考实现对比。

## 3倍视觉分辨率提升

Opus 4.7的另一重大升级是**高分辨率多模态支持**：

- 现在可以处理最长边达2,576像素（约375万像素）的图像
- 相比之前提升了**3倍分辨率**
- 在XBOW视觉精度测试中，从54.5%跃升至98.5%

对于构建"计算机使用"Agent或从复杂技术图表提取数据的分析师来说，这消除了以前限制自主导航的"模糊视觉"天花板。

## Token消费控制：effort参数 + 任务预算

"Agent"特性（暂停、规划、验证）带来了Token消耗和延迟的权衡。为此引入：

- **"effort"参数**：用户可选择xhigh（extra high）档位，在性能与Token支出间获取最佳平衡
- **任务预算（Task Budgets）**：开发者可对自主Agent设置硬性Token上限，防止调试会话产生意外账单

此外，Opus 4.7使用了更新的tokenizer，某些输入的Token数量可能增加1.0–1.35x。

## Claude Code新功能：`/ultrareview`

在Claude Code环境中，新增了`/ultrareview`命令——不是找语法错误，而是模拟资深人工审查者，标记微妙的设计缺陷和逻辑漏洞。

同时，"自动模式"（无需持续许可提示即可自主决策）已扩展到Max plan用户。

## $800B估值、$300亿年化收入

Anthropic正处于财务高峰期：
- 风险投资方报出**$8000亿**估值（相比2月的$3800亿Series G翻倍有余）
- 年化收入已达**$300亿**（2026年4月），主要由企业采用和Claude Code成功驱动

## 对企业的警示

Anthropic建议：**不要仓促从Opus 4.6全面迁移**。Opus 4.7严格遵循字面指令——不再"读出言外之意"，这意味着为旧版本设计的"宽松"或会话式prompt可能产生意外结果。

对于**构建自主Agent或复杂软件系统的团队**，Opus 4.7是决定性升级。但对于**prompt脆弱、利润率薄的遗留应用**，建议分阶段推出并大量重新调优。

Claude Opus 4.7已在Amazon Bedrock、Google Vertex AI和Microsoft Foundry全面上线，API定价维持在**$5/$25每百万Token**。
