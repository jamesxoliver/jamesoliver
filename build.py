#!/usr/bin/env python3
"""
build.py — generates the site's index pages from the folder tree.

The folders and paper files inside this deployable site root are the source of
truth for public writing. Keep unfinished artifacts outside this directory and
restore them only after they are finalized.
You write papers. This script writes everything else:

  - index-details.html    alternative root: nested <details> dropdowns
  - all.html              flat list of every paper (ctrl-F / crawlers)
  - <branch>/index.html   one listing page per branch, recursive

The root index is handwritten and intentionally remains plain HTML. This script
never overwrites it.

Branch display names come from an optional _meta.txt in each branch
folder (line 1: display name, line 2: tagline shown on that branch's
own page). Without it, the folder name is title-cased.

Paper titles are parsed from the paper files themselves (the <h1>),
so a paper's page is the only place its metadata lives.

CSS is read from style.css and stamped inline into every page,
generated or hand-written, so each file stays self-contained.

Run from the site root:  python3 build.py
"""

import os, re, html

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE_TITLE = "James Oliver"

# ---------- helpers ----------

def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()

def write(path, text):
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print("wrote:", os.path.relpath(path, ROOT))

CSS = read(os.path.join(ROOT, "style.css"))
STYLE_BLOCK = f"<style>\n{CSS}</style>"

def page(title, body):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{html.escape(title)}</title>
{STYLE_BLOCK}
</head>
<body>

{body}
</body>
</html>
"""

def is_branch(path):
    return os.path.isdir(path) and not os.path.basename(path).startswith((".", "_"))

def is_paper(path):
    name = os.path.basename(path)
    return (name.endswith(".html") and name != "index.html"
            and not name.startswith(("index-", "all")))

def branch_meta(path):
    meta = os.path.join(path, "_meta.txt")
    if os.path.exists(meta):
        lines = read(meta).strip().splitlines()
        name = lines[0].strip() if lines else ""
        tagline = lines[1].strip() if len(lines) > 1 else ""
        if name:
            return name, tagline
    return os.path.basename(path).replace("-", " ").title(), ""

def paper_title(path):
    src = read(path)
    h1 = re.search(r"<h1>(.*?)</h1>", src, re.S)
    return re.sub(r"<.*?>", "", h1.group(1)).strip() if h1 else os.path.basename(path)

def restamp_css(path):
    src = read(path)
    new = re.sub(r"<style>.*?</style>", STYLE_BLOCK, src, count=1, flags=re.S)
    if new != src:
        write(path, new)

def collect(path):
    branches, papers = [], []
    for name in sorted(os.listdir(path)):
        full = os.path.join(path, name)
        if is_branch(full):
            branches.append(full)
        elif is_paper(full):
            papers.append(full)
    return branches, papers

# ---------- listing fragments ----------

def papers_list(papers, rel_to):
    items = []
    for p in papers:
        href = os.path.relpath(p, rel_to)
        items.append(f'  <li><a href="{href}">{html.escape(paper_title(p))}</a></li>')
    return '<ul class="papers">\n' + "\n".join(items) + "\n</ul>"

def branch_tree(path, rel_to):
    """Nested <ul> of branches and sub-branches. Links only, no papers."""
    branches, _ = collect(path)
    if not branches:
        return ""
    items = []
    for b in branches:
        name, _ = branch_meta(b)
        href = os.path.relpath(b, rel_to) + "/"
        sub = branch_tree(b, rel_to)
        sub = ("\n" + sub) if sub else ""
        items.append(f'  <li><a href="{href}">{html.escape(name)}</a>{sub}</li>')
    return '<ul class="tree">\n' + "\n".join(items) + "\n</ul>"

def details_tree(path, rel_to):
    """Nested <details>: branches expand in place to sub-branches and papers."""
    branches, _ = collect(path)
    out = []
    for b in branches:
        name, _ = branch_meta(b)
        href = os.path.relpath(b, rel_to) + "/"
        sub_branches, papers = collect(b)
        inner = ""
        if sub_branches:
            inner += details_tree(b, rel_to)
        if papers:
            inner += papers_list(papers, rel_to) + "\n"
        out.append(
            f'<details class="branch">\n'
            f'<summary><a href="{href}">{html.escape(name)}</a></summary>\n'
            f'{inner}</details>'
        )
    return "\n".join(out) + "\n"

# ---------- branch pages (recursive) ----------

def build_branch(path, crumbs):
    name, tagline = branch_meta(path)
    branches, papers = collect(path)

    up = " / ".join(f'<a href="{href}">{html.escape(label)}</a>'
                    for label, href in crumbs)
    body = f'<div class="up">{up}</div>\n\n<h1>{html.escape(name)}</h1>\n'
    if tagline:
        body += f'<p class="tagline">{html.escape(tagline)}</p>\n'

    if branches:
        body += "\n" + branch_tree(path, path) + "\n"
    if papers:
        body += "\n" + papers_list(papers, path) + "\n"

    write(os.path.join(path, "index.html"), page(f"{name} — {SITE_TITLE}", body))

    for b in branches:
        deeper = [(label, "../" + href) for label, href in crumbs] + [(name, "../")]
        build_branch(b, deeper)

    for p in papers:
        restamp_css(p)

# ---------- root pages ----------

def build_root():
    branches, _ = collect(ROOT)

    if not branches:
        print("no public writing; preserved handwritten index.html")
        return

    # 1. details variant: nested dropdowns, papers included
    body = f"<h1>{SITE_TITLE}</h1>\n\n"
    body += details_tree(ROOT, ROOT)
    body += '\n<p class="up"><a href="all.html">all papers</a></p>\n'
    write(os.path.join(ROOT, "index-details.html"),
          page(f"{SITE_TITLE} (details variant)", body))

    # 2. flat /all page
    everything = []
    def walk(path):
        bs, ps = collect(path)
        everything.extend(ps)
        for b in bs:
            walk(b)
    walk(ROOT)
    everything.sort(key=lambda p: paper_title(p).lower())

    body = f'<div class="up"><a href="./">{SITE_TITLE}</a></div>\n\n'
    body += "<h1>all papers</h1>\n\n"
    body += papers_list(everything, ROOT) + "\n"
    write(os.path.join(ROOT, "all.html"), page(f"All papers — {SITE_TITLE}", body))

    # 3. branch pages, recursive
    for b in branches:
        build_branch(b, [(SITE_TITLE, "../")])

if __name__ == "__main__":
    build_root()
    print("done.")
