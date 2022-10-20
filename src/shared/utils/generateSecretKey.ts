type FuncType = (timestamp: number) => string;

export const generateSecretKey: FuncType = timestamp => {
  const secret = process.env.LOCAL_UPLOAD_SECRET;

  if (!secret) return '';

  const number =
    (Number(
      secret
        .split('')
        .filter(n => !isNaN(Number(n)))
        .join(''),
    ) *
      timestamp) /
    secret.length;

  const firstHalfSecret = secret.slice(0, secret.length / 2).toString();
  const secondHalfSecret = secret
    .slice(secret.length / 2, secret.length - 1)
    .toString();

  const firstHalfNumber = String(number).slice(0, String(number).length / 2);
  const secondHalfNumber = String(number).slice(
    String(number).length / 2,
    String(number).length - 1,
  );

  return `${firstHalfNumber}${firstHalfSecret}${secondHalfNumber}${secondHalfSecret}${number}`;
};
