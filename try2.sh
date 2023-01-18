#!/bin/bash
set -e
#echo '' > add_new_recipes_since

LOGLEVEL=INFO python -m recibundler next-recipe ../recipes.csv

# python build_recipes.py

#cd ..
#hugo -D
#cd scripts
#LOGLEVEL=DEBUG python try_parse_ingredient.py $HOME/Downloads/KitchenDB\ Submit\ Recipe\ \(Responses\)\ -\ Form\ Responses\ 1.csv
