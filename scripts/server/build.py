"""
For building the site locally.

NOTE: deploy.py also builds everything (and additionally deploys it after building)
"""

from deploy import build_recipes, build_hugo, add_pagefind


def build():
    print('building recipes')
    build_recipes()

    print('building site with hugo')
    build_hugo()

    print('adding pagefind')
    add_pagefind()


if __name__ == "__main__":
    build()
