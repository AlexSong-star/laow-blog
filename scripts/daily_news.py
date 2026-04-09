#!/usr/bin/env python3
"""
每日新闻/博客自动生成脚本
- 7:30 早间新闻
- 12:00 午间博客
- 19:00 晚间博客
"""
import subprocess
import json
import sys
from datetime import datetime

BLOG_REPO = "/tmp/laow-blog-git"
POSTS_DIR = f"{BLOG_REPO}/posts"

def get_time_slot():
    """根据当前时间判断博客类型"""
    hour = datetime.now().hour
    if hour == 7:
        return "morning", "早间新闻"
    elif hour == 12:
        return "noon", "午间博客"
    elif hour == 19:
        return "evening", "晚间博客"
    else:
        return "morning", "早间新闻"

def search_hn(query, tags="story", hits=20):
    """搜索 HN Algolia API"""
    import urllib.request
    import urllib.parse
    
    url = f"https://hn.algolia.com/api/v1/search?query={urllib.parse.quote(query)}&tags={tags}&hitsPerPage={hits}"
    try:
        with urllib.request.urlopen(url, timeout=10) as r:
            return json.loads(r.read())
    except Exception as e:
        print(f"HN API error: {e}", file=sys.stderr)
        return {"hits": []}

def search_news():
    """搜索 AI/OpenClaw 相关新闻"""
    results = []
    
    # 多角度搜索
    queries = [
        "OpenClaw AI agent",
        "AI agent autonomous MCP",
        "OpenClaw skill plugin security",
    ]
    
    for q in queries:
        data = search_hn(q)
        for h in data.get("hits", []):
            title = h.get("title", "")
            pts = h.get("points", 0)
            url = h.get("url", "")
            ts = h.get("created_at", "")[:10]
            if title and pts >= 1:
                results.append({
                    "title": title,
                    "pts": pts,
                    "url": url,
                    "date": ts,
                    "query": q
                })
    
    # 去重（按标题）
    seen = set()
    unique = []
    for r in results:
        if r["title"] not in seen:
            seen.add(r["title"])
            unique.append(r)
    
    # 按 points 排序
    unique.sort(key=lambda x: x["pts"], reverse=True)
    return unique[:15]

def generate_blog_content(news_items, slot):
    """生成博客内容"""
    slot_name = slot[1]
    date_str = datetime.now().strftime("%Y-%m-%d")
    time_str = date_str
    
    if slot == "morning":
        return generate_morning_news(news_items, date_str)
    elif slot == "noon":
        return generate_noon_blog(news_items, date_str)
    else:
        return generate_evening_blog(news_items, date_str)

def generate_morning_news(news, date_str):
    """生成早间新闻"""
    # 取前5条
    top5 = news[:5]
    
    items_md = ""
    for i, n in enumerate(top5, 1):
        items_md += f"- [{n['title']}]({n['url']}) ({n['pts']}pts, {n['date']})\n"
    
    return f"""---
title: "AI Agent 每日资讯速递 · {date_str}"
date: "{date_str}"
category: "新闻"
image: "/images/articles/{date_str}-morning-news.jpg"
tags: ["AI Agent", "OpenClaw", "每日资讯"]
---

## 今日要闻

{items_md}

> 数据来源：Hacker News | 整理时间：{datetime.now().strftime('%H:%M')}
"""

def generate_noon_blog(news, date_str):
    """生成午间博客 - 深度分析"""
    top3 = news[:3]
    
    body = ""
    for i, n in enumerate(top3, 1):
        body += f"""### {i}. {n['title']}

- 🔗 来源：{n['url']}
- ⭐ {n['pts']} points | {n['date']}

"""
    
    return f"""---
title: "AI Agent 中午充电站 · {date_str}"
date: "{date_str}"
category: "博客"
image: "/images/articles/{date_str}-noon-blog.jpg"
tags: ["AI Agent", "深度分析"]
---

## 今日深度

{body}

---
⏰ 整理时间：{datetime.now().strftime('%H:%M')} | 数据来源：Hacker News
"""

def generate_evening_blog(news, date_str):
    """生成晚间博客 - 一周回顾"""
    all_news = news[:8]
    
    items_md = ""
    for n in all_news:
        items_md += f"- **{n['title']}** ({n['pts']}pts, {n['date']})\n"
    
    return f"""---
title: "AI Agent 日报 · {date_str}"
date: "{date_str}"
category: "博客"
image: "/images/articles/{date_str}-evening-daily.jpg"
tags: ["AI Agent", "日报", "OpenClaw"]
---

## 今日资讯汇总

{items_md}

---
📅 整理时间：{datetime.now().strftime('%Y-%m-%d %H:%M')} | 数据来源：Hacker News
"""

def save_and_push(filename, content):
    """保存博客并推送到 GitHub"""
    import os
    
    filepath = f"{POSTS_DIR}/{filename}"
    
    with open(filepath, "w") as f:
        f.write(content)
    
    # Git add + commit + push
    cmds = [
        ["git", "add", f"posts/{filename}"],
        ["git", "commit", "-m", f"Auto blog: {filename}"],
        ["git", "push", "origin", "main"],
    ]
    
    for cmd in cmds:
        result = subprocess.run(cmd, cwd=BLOG_REPO, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"Git error: {result.stderr}", file=sys.stderr)
            return False
    
    print(f"✅ Pushed: {filename}")
    return True

def main():
    slot, slot_name = get_time_slot()
    date_str = datetime.now().strftime("%Y-%m-%d")
    filename = f"{date_str}-{slot}-daily.md"
    
    print(f"📰 [{slot_name}] 搜索新闻中...")
    news = search_news()
    print(f"   找到 {len(news)} 条新闻")
    
    print(f"📝 [{slot_name}] 生成博客中...")
    content = generate_blog_content(news, slot)
    
    print(f"🚀 [{slot_name}] 推送到 GitHub...")
    ok = save_and_push(filename, content)
    
    if ok:
        print(f"✅ [{slot_name}] 完成！")
    else:
        print(f"❌ [{slot_name}] 失败！", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
