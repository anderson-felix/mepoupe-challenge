Essa API já está em ambiente de produção. Para consultar acesse https://api.mepoupe.darklabs.com.br

Para iniciar a aplicação em ambiente de desenvolvimento, execute o seguinte comando:

`yarn image:build && yarn up && yarn typeorm migration:run && yarn logs`

Os endpoints dísponíveis são:

- _Busca de endereço baseada em CEP_

` GET http://localhost:5000/address/:CEP`

- _Cálculo da média entre dois valores_

`GET http://localhost:5000/average/:valor1/:valor2`

- _Listagem todos as operações processadas com filtragem e paginação_

`GET http://localhost:5000/logs`

**Query filtering examples**

- _paginação_

` http://localhost:5000/logs?limit=10&page=2`

- _por coluna específica_

` http://localhost:5000/logs?type=address`

- _por palavras chave CASE SENSITIVE_

` http://localhost:5000/logs?detail.has=operation`

- _por palavras chave CASE INSENSITIVE_

` http://localhost:5000/logs?detail.ihas=operation`

- _ordenação por colunas especifícas de forma crescente ou decrescente_

` http://localhost:5000/logs?sort=created_at&order=desc`
