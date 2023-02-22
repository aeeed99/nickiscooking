export const replaceFraction = (string: string): string => {
  return string
    .replace("1/10", "⅒")
    .replace("1/9", "⅑")
    .replace("1/8", "⅛")
    .replace("1/7", "⅐")
    .replace("1/6", "⅙")
    .replace("1/5", "⅕")
    .replace("1/4", "¼")
    .replace("1/3", "⅓")
    .replace("1/2", "½")
    .replace("3/5", "⅗")
    .replace("2/3", "⅔")
    .replace("3/4", "¾")
    .replace("4/5", "⅘")
    .replace("5/6", "⅚")
    .replace("7/8", "⅞");
};
