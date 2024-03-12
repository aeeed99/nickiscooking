"""
ASSUMES YOUR WORKING DIRECTORY IS scripts/

builds new recipes from the submitted google sheet.

Each new recipe should be its own separate PR. Therefore, it should be ran with
a script that can do said checkout and PR.

**Required**: a text file, `add_new_recipes_since`, containing one line--the iso
date of the last recipe to be added. This script will 
"""
import sys
import os
import csv
import json
import typing as t
from typing import Iterator
from datetime import datetime
import logging
from recibundler.schema import reciperow
from recibundler import json_writing
import gsheets_download

ADD_NEW_RECIPES_SINCE_PATH = "add_new_recipes_since"

T = t.TypeVar("T")

logging.basicConfig(level=os.environ.get("LOGLEVEL", "WARN"))


def add_new_recipes(filepath=None):
    logging.debug(f"filepath is {filepath}")

    try:

        reader: Iterator = (
            csv.reader(open(filepath, newline=""))
            if filepath
            else gsheets_download.fetch()
        )

        with open(ADD_NEW_RECIPES_SINCE_PATH) as datefh:
            try:
                last_date = datetime.fromisoformat(datefh.read().strip())
            except ValueError:
                logging.warn("starting from beginning of time")
                last_date = datetime(year=2022, month=1, day=28)

        # skip the header
        next(reader)

        for recipe in reader:
            recipe += [None, None]
            print(recipe)
            recipe = reciperow.reciperow(*recipe[:12])
            if reciperow.is_recipe_old(recipe, last_date):
                continue
            logging.info(f"the next recipe is {recipe.name}")
            print(recipe)
            parsed_recipe = json_writing.ai_recipe_to_json.main(recipe)
            try:
                json_writing.write_recipe_to_json(parsed_recipe, { "name": recipe.name })
            except Exception as e:
                logging.error(f'got this error will try again: {e}')
                parsed_recipe = json_writing.ai_recipe_to_json.main(recipe, additional_messages=[
                    {
                        "role": "system",
                        "message": json.dumps(parsed_recipe)
                    },
                    {
                        "role": "user",
                        "message": f"I got an error with that json, this is the python error: \n\n{e}\n\n"
                        "can you try again? Keep in mind the entire json schema. Don't apologize, just output raw json"
                    }
                ])
                json_writing.write_recipe_to_json(parsed_recipe, { "name": recipe.name })

            with open(ADD_NEW_RECIPES_SINCE_PATH, mode="w") as datefh:
                datefh.write(str(reciperow.isodate_from_recipe(recipe)))
            return

        logging.error("no new recipes")
        sys.exit(1)
    finally:
        print('done')


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("please pass the path to the file to build recipes from.")
        sys.exit(1)
    add_new_recipes(sys.argv[1])
