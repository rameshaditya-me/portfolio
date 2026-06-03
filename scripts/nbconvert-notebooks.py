#!/usr/bin/env python3
"""Convert notebooks from Easy-Classical-ML-DL into static HTML for the site."""

from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    yaml = None

ROOT = Path(__file__).resolve().parents[1]
SOURCES_PATH = ROOT / "content" / "notebooks" / "sources.yaml"


def load_sources() -> tuple[Path, list[dict]]:
    if yaml is None:
        raise SystemExit("PyYAML is required: pip install pyyaml")

    if not SOURCES_PATH.is_file():
        raise SystemExit(f"Missing sources config: {SOURCES_PATH}")

    data = yaml.safe_load(SOURCES_PATH.read_text()) or {}
    ml_repo = os.environ.get("EASY_ML_DL_ROOT", data.get("ml_repo", "../Easy-Classical-ML-DL"))
    ml_root = Path(ml_repo).expanduser()
    if not ml_root.is_absolute():
        ml_root = (ROOT / ml_root).resolve()

    if not ml_root.is_dir():
        raise SystemExit(
            f"Easy-Classical-ML-DL not found at {ml_root}\n"
            "Set EASY_ML_DL_ROOT or update content/notebooks/sources.yaml"
        )

    notebooks = data.get("notebooks") or []
    if not notebooks:
        raise SystemExit(f"No notebooks listed in {SOURCES_PATH}")

    return ml_root, notebooks


def convert_notebook(ipynb: Path, html_path: Path) -> None:
    html_path.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            sys.executable,
            "-m",
            "nbconvert",
            "--to",
            "html",
            str(ipynb),
            "--output",
            html_path.stem,
            "--output-dir",
            str(html_path.parent),
        ],
        check=True,
    )
    print(f"{ipynb} -> {html_path.relative_to(ROOT)}")


def main() -> None:
    ml_root, notebooks = load_sources()

    for entry in notebooks:
        source_rel = entry.get("source")
        html_rel = entry.get("html")
        if not source_rel or not html_rel:
            raise SystemExit(f"Each notebook entry needs source and html: {entry}")

        ipynb = ml_root / source_rel
        html_path = ROOT / html_rel

        if not ipynb.is_file():
            raise SystemExit(f"Notebook not found: {ipynb}")

        convert_notebook(ipynb, html_path)


if __name__ == "__main__":
    main()
