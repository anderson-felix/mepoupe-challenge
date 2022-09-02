## Essa API já está em ambiente de produção. Para consultar acesse **https://api.mepoupe.darklabs.com.br**

---

## **SETUP**

### Para iniciar a aplicação em ambiente de desenvolvimento, copie e renomeie os arquivos ".env.example" para ".env" e "ormconfig.example.json" para "ormconfig.json", em seguida execute o seguinte comando:

```bash
yarn image:build && yarn up && yarn typeorm migration:run && yarn logs
```

### Os endpoints dísponíveis são:

- _Busca de endereço baseada em CEP_

```typescript
GET http://localhost:5000/address/:CEP
```

- _Cálculo da média entre dois valores_

```typescript
GET http://localhost:5000/average/:valor1/:valor2
```

- _Listagem todos as operações processadas com filtragem e paginação_

```typescript
GET http://localhost:5000/logs
```

## **Query filtering examples**

- _paginação_

```typescript
http://localhost:5000/logs?limit=10&page=2
```

- _por coluna específica_

```typescript
http://localhost:5000/logs?type=address
```

- _por palavras chave CASE SENSITIVE_

```typescript
http://localhost:5000/logs?detail.has=operation
```

- _por palavras chave CASE INSENSITIVE_

```typescript
http://localhost:5000/logs?detail.ihas=operation
```

- _ordenação por colunas especifícas de forma crescente ou decrescente_

```typescript
http://localhost:5000/logs?sort=created_at&order=desc
```
