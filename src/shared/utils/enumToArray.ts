export const enumToArray = <T>(enumeration: T) =>
  Object.keys(enumeration)
    .filter(key => Number.isNaN(Number(key)))
    .map(key => enumeration[key as keyof T]);
