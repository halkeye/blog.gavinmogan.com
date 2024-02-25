---
title: Bash Remove Extension
author: halkeye
post_id: "587"
date: 2015-07-03
post_name: "587"
status: publish
tags:
  - linux
datetime: 2015-07-03T01:28:19+0800
permalink: /2015/07/03/587/index.html
---

I can't imagine me ever needing this again, but it does highlight bash's ability to strip extensions.

To convert avis to mkv's and update language from unknown to english:

```bash
for i in *.avi; do
  mkvmerge -o "${i%.avi}.mkv" "$i" \
  && mkvpropedit "${i%.avi}.mkv" --edit track:a1 \
  --set language=rus --edit track:a2 --set language=eng;
done
```
