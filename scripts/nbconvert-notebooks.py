#!/usr/bin/env python3
"""Convert .ipynb files under content/notebooks/ to static HTML for the site."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NOTEBOOK_DIR = ROOT / "content" / "notebooks"


def convert_notebook(ipynb: Path) -> None:
    html_path = ipynb.with_suffix(".html")
    subprocess.run(
        [
            sys.executable,
            "-m",
            "nbconvert",
            "--to",
            "html",
            str(ipynb),
            "--output",
            ipynb.stem,
            "--output-dir",
            str(ipynb.parent),
        ],
        check=True,
    )
    print(f"Wrote {html_path.relative_to(ROOT)}")


def main() -> None:
    notebooks = sorted(NOTEBOOK_DIR.glob("*.ipynb"))
    if not notebooks:
        print(f"No notebooks found in {NOTEBOOK_DIR}")
        return

    for ipynb in notebooks:
        convert_notebook(ipynb)


if __name__ == "__main__":
    main()
