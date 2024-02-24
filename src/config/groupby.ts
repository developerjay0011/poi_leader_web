type GroupedItems<T> = {
  [key: string]: T[];
};

export function groupBy<T>(
  list: T[],
  keyGetter: (item: T) => string
): GroupedItems<T> {
  const grouped: GroupedItems<T> = {};

  list.forEach((item) => {
    const key = keyGetter(item);
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
  });

  return grouped;
}
