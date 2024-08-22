from openai import OpenAI
import json
import os
from ..reciparcer.subparsers.amount import _parse_unit
from recibundler.reciparcer.constants import UNPARSABLE_UNIT

import logging as log

log.basicConfig(level=os.environ.get("LOGLEVEL", log.INFO))

script_dir = os.path.dirname(os.path.abspath(__file__))


with open(os.path.join(script_dir, "../../../../secrets.json")) as fh:
    secrets = json.loads(fh.read())


def main(recipe, additional_messages=None):
    if additional_messages is None:
        additional_messages = []
    client = OpenAI(api_key=secrets["OPENAPI_SECRET_KEY"])

    with open(os.path.join(script_dir, "../../../../data/schemas/recipes.json")) as fh:
        recipe_schema = fh.read()

        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": f"This is a JSON Schema that expresses a cooking recipe. Do you understand it?\n{recipe_schema}",
            },
            {
                "role": "system",
                "content": "Yes, I understand the JSON schema. It defines the structure and constraints for a cooking recipe. It includes properties for the recipe name, summary, cuisine, diet, difficulty level, cooking time, ingredients, steps, and more.The schema also defines the required properties for a valid recipe. If you have any specific questions or need help with anything related to this JSON schema, feel free to ask!",
            },
            {
                "role": "user",
                "content": "Do you think you can translate a written english recipe into this json schema?",
            },
            {
                "role": "system",
                "content": "Yes, I can certainly help with that. If you provide the written English recipe, I can assist in translating it into the JSON schema format. Just let me know the details, and I'll guide you through the translation process",
            },
            # {
            #     "role": "user",
            #     "content": """Great! But first, let me tell you a bit more about how to interpret the schema.

            #     PLEASE Take care to note the enum choices for the "unit" property, they are abbreviated versions of standard measuring units. If there is a unit in the recipe that doesn't match up to any of them, use "customUnit" instead. Sometimes the unit is the ingredient itself, like "1 apple". In those cases, use "customUnit" set as an empty string. Use this guide to translate the units you see:

            #     ```
            #     pound(s) -> "lb",
            #     ounce(s) -> "oz",
            #     gram(s) -> "g",
            #     cup(s) -> "cup",
            #     fluid ounce(s) -> "fl oz",
            #     milliliter(s) -> "ml",
            #     pint(s) -> "pint",
            #     teaspoon(s) -> "tsp",
            #     tablespoon(s) ->"tbsp",
            #     pinch/pinch of -> "pinch",
            #     kilogram(s) -> "kg",
            #     gallon(s) -> "gal",
            #     liter(s) -> "liter"
            #     ```

            #     A "modifier" is a way to prepare an ingredient. In the list of ingredients, this is usually the verbs, which follows a comma after the ingredient. It can sometimes be in parentheses. Something like "10 pounds shrimp, peeled and deveined" would be \\{"amount": [10], "ingredient": "shrimp", "customUnit": "", "modifier": "peeled and deveined" }.

            #     The "amount" property in the ingredient can be an array of 1 number for a static amount, or 2 number for a range. For example, if the recipe called for "1-3" apples, the amount would be [1, 3].

            #     Finally, don't put anything for "imageUrl", "originalSource", "media", "photoAttribution", or "attribution" fields. Does this all make sense?
            #     """,
            # },
            # {
            #     "role": "system",
            #     "content": "Yes, I've noted the details and guidelines for translating the recipe into the JSON schema format. I understand the conventions for units, modifiers, and the structure of the recipe. When you're ready to provide the English recipe, I can help you convert it into the JSON schema using the information you've provided. Let me know if you have the recipe or if there's anything else you need assistance with!",
            # },
            {
                "role": "user",
                "content": f"Great! Here's the recipe represented as a python dict. Make sure the amount property is never empty. Please respond with just the raw json representation (don't even use things like ```json around it), so that it can be parsed.:\n\n${recipe._asdict()}",
            },
        ] + additional_messages
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=messages,
    )
    print("CHATGPT RESPONSE:")
    print(response.choices[0].message.content)
    try:
        data = json.loads(response.choices[0].message.content)
    except json.decoder.JSONDecodeError as err:
        log.error("AI returned invalid json:\n{err}")
        log.error("Sending back the error and trying again")
        messages.append({
            'role': 'system',
            'content': response.choices[0].message.content
        })
        messages.append({
            'role': 'user',
            'content': f'''Looks like your output isn't json parsable. I ran it through json.loads and got this error:

            ```
            {err}
            ```

            Can you try again? Don't apologize, just output raw valid json so it can be correctly parsed.
            '''
        })
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=messages,
        )
        data = json.loads(response.choices[0].message.content)

    ## common data corrections ##
    if "ingredients" not in data:
        breakpoint()
    for section in data["ingredients"]:
        for ingredient in section["ingredients"]:
            if "customUnit" in ingredient and "unit" in ingredient:
                # gpt sometimes adds a unit as an empty string when it should
                # not add at all
                if ingredient["unit"] == "":
                    del ingredient["unit"]
                else:
                    # gpt does not always use abbreviated units
                    ingredient["unit"] = _parse_unit(ingredient["unit"])
                    # if it's an unparsable unit, it might have put a customUnit in the unit field
                    if ingredient['unit'] is UNPARSABLE_UNIT:
                        ingredient['customUnit'] = ingredient['unit']
                        del ingredient['unit']
                        log.error(f"Moved unit to customUnit as it was unparsable. Check the ingredient: \n{ingredient}")
                    del ingredient["customUnit"]
    fields_to_delete_if_none = [
        'summary',
        'imageUrl',
        'yields',
        'yieldsUnit',
        'prepTimeMinutes',
        'cookTimeMinutes',
        'originalSource',
        'difficulty',
    ]
    """
    units of measurement (ingredient.unit) to correct
    """
    units_to_correct = {
        'tablespoons': 'tbsp',
        'cups': 'cup'
    }
    fields_to_delete = ['attribution', 'photoAttribution']
    for field in fields_to_delete_if_none:
        if field in data and data[field] is None:
            log.warn(f'Deleting invalid field {field} as it had a null value.')
            del data[field]
    for field in fields_to_delete:
        if field in data:
            del data[field]
    for si, section in enumerate(data["ingredients"]):
        for ii, ing in enumerate(section["ingredients"]):
            if "unit" not in ing:
                breakpoint()
            if ing["unit"] in units_to_correct.keys():
                corrected = units_to_correct[ing["unit"]]
                log.info(f'Correcting unit: {ing["unit"]} -> {corrected}')
                try:
                    data["ingredients"][si]["ingredients"][ii]["unit"] = corrected
                except KeyError:
                    log.error(f'could not correct unit in section {si}, ingredient {ii}')
                    pass

    if 'difficulty' in data and data['difficulty'] == 0:
        del data['difficulty']

    data["name"] = data["name"].replace(
        "$", "_").replace("*", "_").replace("&", " and ")

    data['version'] = '1'
    print(data)
    return data


if __name__ == "__main__":
    main()
