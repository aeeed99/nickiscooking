---
title: '{{ replace .Name "-" " " | title }}' #$TITLE$
date: {{ .Date }} #$DATE$
preHeader: 'Nick is cooking...'
forceDescription: false
categories: [] #$CATEGORIES$
summary: " " #$SUMMARY$
#$AUTHOR$
#$PHOTO_AUTHOR$
#$PHOTO_AUTHOR_LINK$
prepTime: 0
cookTime: 0
youtube: ""
difficulty: 0
# Replace with /images/<image-name>
featured_image: ""
description: How to make {{ replace .Name "-" " " | title }} from the free online cookbook
diets: []
cuisines: []
#$JSON_DATA$

---
{{< recipe-data url="data/recipes/{{ replace .Name "\"" "\\\"" }}.json">}}
{{< recipe-summary url="data/recipes/{{ replace .Name "\"" "\\\"" }}.json">}}
{{< recipe-youtube url="data/recipes/{{ replace .Name "\"" "\\\"" }}.json">}}
{{< recipe-list url="data/recipes/{{ replace .Name "\"" "\\\"" }}.json">}}
