declare namespace Express {
  export interface Request {
    paging: import('@shared/infra/http/middlewares/getPagingHandler').IPagingTypeORM;
  }
}
