---
title: Renovate and Ansible
date: 2024-05-04
tags:
  - devops
	- ansible
post_name: renovate-and-ansible
author: halkeye
---

npm-check-updates, [Greenkeeper](https://web.archive.org/web/20240306184824/https://greenkeeper.io/), Dependabot, Renovate. I've always enjoyed tools to keep dependencies up to date. Some have have a better developer / user experience than others over the years.

I'll admit, I would usually just run npm-check-updates -a and let it go, and then see what breaks. This usually lead to doing updates once a quarter, as they took more effort, and thus not something I wanted to do often. I tried subscribing to blogs or changelogs, but it was hard to keep up to date.

Then greenkeeper came out. I believe I first heard of it at the great CascadiaJS many years ago. I just loved the idea of it, so quickly started hooking it up to repos. It had its flaws, but it worked.

Then dependabot rolled out. It had more support, more developers. I ended up switching over to it. It was popular enough that github acquired it, and integrated it directly into github. The weird thing is they quickly killed off a lot of features and customization, but I've since heard its now finally being added back in.

That brings me to renovate. So far its my favourite. Its very customizable, from when it runs, to what it considereds needing upgrades (minor, patch, dev only, etc), to how it groups them (all core react modules can get upgraded at the same time). Supports so many different languages and system (javascript, python, go, ruby, github actions, kubernetes, just to name a few). But for me the big eye opener was learning about the regex support. If you have any items you that are not handled out of the box, most of the time you can get away with writing regex support. [Grafana dashboards](https://github.com/renovatebot/renovate/discussions/16624) for those doing infra as code, was my first exposure to this.

That brings me to the last few weeks. I am prepping to get a new work laptop soon, and don't really want to set everything up by hand again. I have [ansible](https://github.com/halkeye/halkeye-ansible) scripts I've used in the past, but they are almost always out of date as I end up finding them too frustrating to use for the quick update of tooling, so just do the initial install. (I was using asdf to quickly install apps to test them).

With the updates this week, I found and updated to [Makefile.venv](https://github.com/sio/Makefile.venv) which makes managing a python virtualenv inside a Makefile so easy and maintable. I've now switched to an [ansible module](FIXME) that can figure out which tarball is needed to download, and extract them to the right place, so I don't need to write all the custom logic to extract things. I also wanted to make sure I [specified the version](FIXME - inventory) of everything so i could quickly update and rollback as needed as I found in my infra-as-code for kubernetes its so nice to have that history and rebuildability.


