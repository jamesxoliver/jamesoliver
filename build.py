#!/usr/bin/env python3
"""
build.py — generates the site's index pages from the folder tree.

The folders and paper files inside this deployable site root are the source of
truth for public writing. Keep unfinished artifacts outside this directory and
restore them only after they are finalized.
You write papers. This script writes everything else:

  - all.html              flat list of every paper (ctrl-F / crawlers)
  - <branch>/index.html   one listing page per branch, recursive

The root index is handwritten and intentionally remains plain HTML. This script
never overwrites it.

Branch display names come from an optional _meta.txt in each branch
folder (line 1: display name, line 2: tagline shown on that branch's
own page). Without it, the folder name is title-cased.

Paper titles are parsed from the paper files themselves (the <h1>),
so a paper's page is the only place its metadata lives.

Pages are plain semantic HTML in the browser's default style. style.css
holds only what defaults get wrong for reading (line length, dark mode,
table spacing). It is stamped inline into every page, generated or
hand-written, and into _paper-template.html, so each file stays
self-contained.

Run from the site root:  python3 build.py
"""

import os, re, html

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE_TITLE = "James Oliver"
PUBLISH = "papers"   # drop a finished .md or .html here and it goes live

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
    name = os.path.basename(path)
    return os.path.isdir(path) and not name.startswith((".", "_")) and name != PUBLISH

def is_paper(path):
    name = os.path.basename(path)
    return (name.endswith(".html") and name != "index.html"
            and not name.startswith(("index-", "all", "_")))

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

def paper_claim(path):
    """The one-sentence claim a paper page carries under its title, if any."""
    m = re.search(r'<p class="claim">(.*?)</p>', read(path), re.S)
    return " ".join(re.sub(r"<.*?>", "", m.group(1)).split()) if m else ""

def restamp_css(path):
    src = read(path)
    new = re.sub(r"<style>.*?</style>", lambda m: STYLE_BLOCK, src, count=1, flags=re.S)
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
        claim = paper_claim(p)
        claim = f": {claim.rstrip('.')}" if claim else ""
        items.append(f'  <li><a href="{href}">{html.escape(paper_title(p))}</a>{claim}</li>')
    return '<ul>\n' + "\n".join(items) + "\n</ul>"

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
    return '<ul>\n' + "\n".join(items) + "\n</ul>"

# ---------- branch pages (recursive) ----------

def build_branch(path, crumbs):
    name, tagline = branch_meta(path)
    branches, papers = collect(path)

    up = " / ".join(f'<a href="{href}">{html.escape(label)}</a>'
                    for label, href in crumbs)
    body = f'<nav>{up}</nav>\n\n<h1>{html.escape(name)}</h1>\n'
    if tagline:
        body += f'<p><em>{html.escape(tagline)}</em></p>\n'

    if branches:
        body += "\n" + branch_tree(path, path) + "\n"
    if papers:
        body += "\n" + papers_list(papers, path) + "\n"

    write(os.path.join(path, "index.html"), page(f"{name} — {SITE_TITLE}", body))
    for p in papers:
        restamp_css(p)

    for b in branches:
        deeper = [(label, "../" + href) for label, href in crumbs] + [(name, "../")]
        build_branch(b, deeper)

# ---------- publish folder ----------
#
# papers/ is the publish slot. A finished piece dropped there as .md is
# converted to a page with _paper-template.html (its first "# " heading is
# the title). A finished .html is used as is. The front page then lists
# every piece in papers/, oldest first, by the order it was added to git.
#
# A .md piece may open with a front-matter block. All three keys are optional:
#
#   ---
#   claim: The one-sentence claim, shown under the title and on the front page.
#   doi: 10.5281/zenodo.0000000
#   pdf: https://zenodo.org/records/0000000/files/paper.pdf
#   ---
#
# Equations written as $...$ or $$...$$ are rendered as MathML, with no script.

import subprocess

def added_order(path):
    out = subprocess.run(["git", "log", "--diff-filter=A", "--format=%at", "--", path],
                         cwd=ROOT, capture_output=True, text=True).stdout.split()
    return int(out[-1]) if out else 2**62

import hashlib

def stamp_scripts(page_path):
    """Add a content hash to each local script address, so a changed script
    is fetched fresh instead of served from a cache under its old address."""
    src = read(page_path)
    folder = os.path.dirname(page_path)
    def fix(m):
        name = m.group(1).split("?")[0]
        f = os.path.join(folder, name)
        if "//" in name or not os.path.exists(f):
            return m.group(0)
        with open(f, "rb") as fh:
            v = hashlib.sha1(fh.read()).hexdigest()[:8]
        return f'<script src="{name}?v={v}">'
    new = re.sub(r'<script src="([^"]+)">', fix, src)
    if new != src:
        write(page_path, new)

def front_matter_claim(src):
    """The claim: line of a piece's opening front-matter block, as plain text."""
    block = re.match(r"---\n(.*?)\n---\n", src, re.S)
    m = re.search(r"^claim:\s*(.+)$", block.group(1), re.M) if block else None
    return m.group(1).strip().strip("\"'") if m else ""

def site_url():
    cname = os.path.join(ROOT, "CNAME")
    host = read(cname).strip() if os.path.exists(cname) else ""
    return f"https://{host}" if host else ""

# ---------- files for agents and crawlers ----------
#
# llms.txt   plain-text index for AI models: title, claim and a link to the
#            markdown source of every piece
# sitemap.xml, robots.txt   every page listed, all crawlers welcome
#
# All three are rewritten on every build, so a new piece needs no extra step.

def build_agent_files(pages):
    base = site_url()
    if not base:
        return
    lines = [f"# {SITE_TITLE}", "",
             "> Papers by James Oliver. Each piece is listed with its one-sentence claim. "
             "Links point to the markdown source, with equations in LaTeX.", "",
             "## Papers", ""]
    urls = [base + "/"]
    for p in pages:
        rel = os.path.relpath(p, ROOT).replace(os.sep, "/")
        md = os.path.splitext(p)[0] + ".md"
        link = os.path.splitext(rel)[0] + ".md" if os.path.exists(md) else rel
        claim = paper_claim(p)
        lines.append(f"- [{paper_title(p)}]({base}/{link})" + (f": {claim}" if claim else ""))
        urls.append(f"{base}/{rel}")
    write(os.path.join(ROOT, "llms.txt"), "\n".join(lines) + "\n")
    sm = ['<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    sm += [f"  <url><loc>{html.escape(u)}</loc></url>" for u in urls]
    sm.append("</urlset>")
    write(os.path.join(ROOT, "sitemap.xml"), "\n".join(sm) + "\n")
    write(os.path.join(ROOT, "robots.txt"),
          f"User-agent: *\nAllow: /\n\nSitemap: {base}/sitemap.xml\n")

def convert_md(md):
    src = read(md)
    m = re.search(r"^#\s+(.+)$", src, re.M)
    title = m.group(1).strip() if m else os.path.splitext(os.path.basename(md))[0]
    if m:
        src = src[:m.start()] + src[m.end():]
    out = os.path.splitext(md)[0] + ".html"
    args = ["-V", f"md={os.path.basename(md)}"]
    claim = front_matter_claim(src)
    if claim:
        args += ["-V", f"description={html.escape(claim, quote=True)}"]
    html_out = subprocess.run(
        ["pandoc", "-f", "markdown", "-t", "html5", "--mathml",
         "--template", os.path.join(ROOT, "_paper-template.html"),
         "-M", f"title={title}"] + args,
        input=src, capture_output=True, text=True, check=True).stdout
    write(out, html_out)

def build_publish():
    folder = os.path.join(ROOT, PUBLISH)
    if not os.path.isdir(folder):
        return
    for name in sorted(os.listdir(folder)):
        if name.endswith(".md"):
            convert_md(os.path.join(folder, name))
    pages = [os.path.join(folder, n) for n in os.listdir(folder) if is_paper(os.path.join(folder, n))]
    for p in pages:
        restamp_css(p)
        stamp_scripts(p)
    pages.sort(key=lambda p: (added_order(os.path.splitext(p)[0] + ".md")
                              if os.path.exists(os.path.splitext(p)[0] + ".md")
                              else added_order(p)))
    if pages:
        body = papers_list(pages, ROOT).replace("<ul>", '<ul class="notes">', 1) + "\n"
    else:
        body = "<p>Nothing published yet.</p>\n"
    write(os.path.join(ROOT, "index.html"), page(SITE_TITLE, body))
    build_agent_files(pages)

# ---------- root pages ----------

def build_root():
    build_publish()
    for name in ("index.html", "_paper-template.html"):
        restamp_css(os.path.join(ROOT, name))
    branches, _ = collect(ROOT)

    if not branches:
        print("no public writing; preserved handwritten index.html")
        return

    # 1. flat /all page
    everything = []
    def walk(path):
        bs, ps = collect(path)
        everything.extend(ps)
        for b in bs:
            walk(b)
    walk(ROOT)
    everything.sort(key=lambda p: paper_title(p).lower())

    body = f'<nav><a href="./">Home</a></nav>\n\n'
    body += "<h1>All papers</h1>\n\n"
    body += papers_list(everything, ROOT) + "\n"
    write(os.path.join(ROOT, "all.html"), page(f"All papers — {SITE_TITLE}", body))

    # 2. branch pages, recursive
    for b in branches:
        build_branch(b, [("Home", "../")])

if __name__ == "__main__":
    build_root()
    print("done.")
