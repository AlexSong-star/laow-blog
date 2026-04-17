---
title: "Salesforce首次披露：企业需要两种完全不同的AI Agent架构"
date: "2026-04-17"
category: "博客"
tags: ["AI Agent", "Agent架构", "企业AI", "数字员工"]
excerpt: "Salesforce EVP Jayesh Govindarjan在TDX 2026上首次披露：客户面向和员工面向的Agent需要完全不同的架构——静态图 vs 动态图。大多数企业用错了。"
image: "https://cdn.jsdelivr.net/gh/AlexSong-star/laow-blog@main/public/images/articles/two-ai-agent-architectures.jpg"
published: true
---

# Salesforce首次披露：企业需要两种完全不同的AI Agent架构

大多数企业在构建AI Agent时，犯了一个根本性的错误：用同一套架构服务两种完全不同的场景。

Salesforce EVP Jayesh Govindarjan在TDX 2026大会上把这个洞察说得很清楚：

> "客户面向Agent需要严格确定性控制。员工面向Agent需要动态自主决策。**它们是两种不同的架构，大多数企业在用同一套方案处理两者。**"

这是本次大会最有价值的技术洞察，没有之一。

## 场景一：客户面向Agent（静态图）

当企业把Agent放到**客户面前**时，有一条不可商量的高压线：客户在愿意让Agent替品牌说话之前，必须确保它遵循特定的规则范式。

Salesforce的解决方案叫**静态图**：

```
[收到客户咨询]
      ↓
[验证身份] → 失败 → [转人工]
      ↓ 成功
[理解意图] → [检索知识库] → [生成回复] → [质量审核] → [发送]
```

在这个图里，每个步骤的下一步是确定的。LLM推理被嵌入每个步骤内部，但**整体路径是预先定义的**。

这是为什么Salesforce要发明Agent Script——一种将状态机逻辑写成确定性代码的DSL（领域特定语言）。在Agent Script里，你定义的是：
- 哪些步骤必须走
- 哪些步骤可以调用LLM推理
- 哪些步骤必须人工确认

```python
# Agent Script伪代码
state: customer_service
  when intent == "refund":
    require(identity_verified=true)
    check_policy(refund_eligible)
    if eligible:
      process_refund()
      send_confirmation()
    else:
      send_rejection()
      log_for_review()
```

关键：在这个架构下，**AI不能自己想路线**。它只能在给定的轨道上滑行。

## 场景二：员工面向Agent（动态图/"Ralph Wiggum循环"）

Govindarjan提到了一个看似荒谬的名字——**"Ralph Wiggum循环"**，来自《辛普森一家》里那个活在自己世界的角色。

这个名字背后有深意：Agent在这个模式下，真的在"自己想路线"。

```
[任务目标]
      ↓
[分解子目标] → [执行子目标A] → [评估结果]
                              ↓ 不满意
                        [调整策略] → [重新执行]
                              ↓ 满意
                        [执行子目标B] → ... → [完成]
```

Agent在运行时展开图——杀死死路径，生成新路径，直到任务完成。专家人类只在最后审查输出。

典型场景：
- 开发者用编码Agent跑深度代码调试循环
- 销售人员用Agent做多源客户背景调研
- 市场人员让Agent生成竞品分析报告

Govindarjan说：**"Ralph Wiggum循环很适合员工面向，因为员工本身就是某件事的专家。开发者是开发专家，销售人员是销售专家。"**

言下之意：专家能识别AI的错误，能判断输出质量。

## 为什么大多数企业用错了

问题在于：构建一套统一架构的成本更低、看起来更简单。但当客户面向Agent用了"动态图"架构时，风险是完全失控的——AI可能给客户承诺无法兑现的东西。

当员工面向Agent用了"静态图"架构时，Agent无法自主决策，变成一个复杂的表单引擎，失去意义。

Govindarjan指出的实际困境：
> "早期Agentforce客户进入生产后，发现整个系统很脆弱。你做一次更改，不知道它100%还能不能工作。所有测试都要重新来。"

这驱动了Agent Script的诞生——给"静态图"提供确定性保证。

## 两种架构的统一底座

Govindarjan给出了一个被低估的技术细节：

> "这是一个动态图。这是一个静态图。**底层都是图。**"

两个架构运行在相同的底层平台和图引擎上。区别在于：
- 静态图：图在部署前完全定义
- 动态图：图在运行时部分展开

这对架构师的意义：不需要两套基础设施，但需要**两套编排逻辑**。

## 实际落地建议

如果你的企业正在部署AI Agent，记住这个框架：

| | 客户面向 | 员工面向 |
|---|---|---|
| **架构** | 静态图 | 动态图 |
| **自主程度** | 低，人工审核 | 高，自主决策 |
| **容错空间** | 几乎零 | 有一定空间 |
| **评估方式** | 结果准确性 | 过程效率+结果质量 |
| **关键约束** | 品牌一致性 | 专家监督 |

**先问自己：这个Agent是给客户用，还是给员工用？**

答案决定了一切。

---

*内容来源：VentureBeat对Salesforce EVP Jayesh Govindarjan的独家采访，TDX 2026*
