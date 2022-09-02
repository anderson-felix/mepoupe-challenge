Crie um projeto Node.JS e implemente os seguintes 2 endPoints:

1.- Cálculo da média

Precisamos fazer o cálculo da média de 2 números, para isto será necessário ter um endpoint que receba esses 2 números e nos retorne a média dos mesmos.

O resultado precisa estar arredondado em duas casas decimais utilizando a estratégia de arredondamento Half Round Up.

O mesmo precisará rodar num docker, para isto o projeto tem que estar corretamente conteinerizado/dockerizado.

Temos que ter tratamento de erro caso os parâmetros estejam errados, inválidos ou inexistentes.

Precisamos implementar Log para saber o que está acontecendo, ou seja, que cálculos estão sendo feitos neste componente.

Comite seu código.

2.- Consulta de CEP.

Precisamos criar um outro endPoint que receba um cep e que o mesmo faça uma consulta deste CEP na viaCEP (https://viacep.com.br/)

O Serviço que precisa ser chamado no ViaCEP é o seguinte: https://viacep.com.br/ws/XXXXXXXX/json

Onde o XXXXXXXX é um Cep válido.

Este endereço tem que ser retornado para o chamador, caso o Bairro não seja encontrado na ViaCEP, além do resto das informações, uma mensagem tem que ser retornada para o cliente informando que não foi possível encontrar o Bairro deste CEP. Exemplo de CEP sem Bairro :18150000

Comite seu código.

Use TypeScript.

Divida em camadas de responsabilidade única, com classes e métodos coesos. Vá pela simplicidade do código.

Implemente testes automatizados.

Finalmente, crie um projeto GitHub, suba seu código e adicione christian.pacheco@mepoupenaweb.com para poder validar.

Boa sorte e na dúvida use sua criatividade.

Ahhh, faltou a data de entrega: sexta-feira, 02.09, às 9h. Caso não consiga enviar por aqui, pode enviar para o e-mail duda.silva@mepoupenaweb.com

Te aguardamos!

Beijos!

Avisar que fiz em usando postgres pq tenho mais prática e não tinha tempo, caso contrário teria usado redis.
