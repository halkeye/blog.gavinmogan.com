---
title: Renaming batch of files (with spaces) in linux
author: halkeye
post_id: "491"
date: 2013-09-28
post_name: renaming-batch-files-spaces-linux
status: publish
tags:
  - linux
datetime: 2013-09-28T22:26:57+0800
permalink: /2013/09/28/renaming-batch-files-spaces-linux/index.html
---

I rename a lot of files. Often by hand as it's just easier. I've tried various combinations of find -print0 | xargs -0, and find -exec, without much luck.

Just So I have reference on what does work:

```bash
find -type f | \
	while read file; do \
		echo mv \"$file\" \"$(echo $file | sed -e 's/^Old Content/New Content/')\"; 
	done | sh
```

Yea I could probably drop the echo mv, and the |sh, but it feels safer to do a dry run

**2023 Update**: the [rename package](https://packages.debian.org/bookworm/rename) (actually the perl module File::Rename cli) makes this way easier, use rename tool don't use the ugly find above.
