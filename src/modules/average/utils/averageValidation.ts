import { Joi } from 'celebrate';

export const joiAverageValidation = Joi.custom((value, helper) => {
  if (isNaN(Number(value)))
    return helper.message('O valor precisa ser um número' as any);
  return true;
});

export const throwAverageError = () => {
  throw new Error(
    'Informe dois valores nos parâmetros de rota para calcular a média',
  );
};
