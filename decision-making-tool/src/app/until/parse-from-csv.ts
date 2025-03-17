export function parseFromCSV(
  csv: string
): { title: string; weight?: string }[] {
  if (!csv) return [];

  const result: { title: string; weight?: string }[] = [];

  for (const line of csv.split('\n')) {
    const fields: string[] = line.split(/[\t,]\s*/);
    if (fields.length === 0) continue;

    let weight: string | undefined;
    let title: string = fields.slice(0, -1).join(' ').trim();

    const lastField: string | undefined = fields.at(-1);
    if (Number.isNaN(Number(lastField))) {
      title = fields.join(' ').trim();
    } else {
      weight = lastField;
    }

    result.push({ title, weight });
  }
  return result;
}
