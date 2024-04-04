export function stringFormat(strTemplate: string, ...args: string[]) {
  return strTemplate.replace(/{(\d+)}/g, (strMatch: string, index: number) => {
    return args[index] || strMatch;
  });
}
