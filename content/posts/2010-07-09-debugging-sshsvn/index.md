---
title: Debugging ssh+svn
author: halkeye
post_id: "388"
date: 2010-07-09
post_name: debugging-sshsvn
status: publish
tags:
  - linux
  - debug
  - ssh
  - ssh+svn
  - svn
datetime: 2010-07-09T08:31:46+0800
permalink: /2010/07/08/debugging-sshsvn/index.html
---

Posting here in case anyone else needs to know.

Was trying to debug a ssh+svn connection. There is a very simple way to get debugging turned on:

```bash
$ export SVN_SSH="ssh -v "
$ svn checkout svn+ssh://
```

Any other ssh commands can be put in that env variable too, so ports and such.
