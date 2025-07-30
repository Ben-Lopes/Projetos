# Projetos de Testes Automatizados com Cypress

Este repositório contém testes automatizados desenvolvidos com Cypress, além de alguns arquivos complementares.

Abaixo, um breve resumo sobre o conteúdo de testes em cada pasta:

- login-logout:
    Contém testes iniciais e simples de login em uma plataforma web. Os testes possuem baixo nível de complexidade e têm como objetivo demonstrar o funcionamento básico do Cypress.

- sauceDemo:
    Os testes dessa pasta envolvem uma camada um pouco maior de complexidade, especialmente no login, onde foi utilizado o pacote dotenv para anonimizar dados sensíveis de acesso — uma boa prática em projetos reais. Além disso, há um teste simulando uma “compra”, com foco em demonstrar formas de identificar e aplicar asserts na aplicação.

- obtencaoEmail:
    Este teste realiza uma requisição para um servidor local que retorna dados de e-mail por meio da API do Gmail. O objetivo é demonstrar como capturar dados enviados por e-mail (como códigos de verificação) e utilizá-los em validações dentro do teste.

- servidorEmailOAuth:
    Conjunto de arquivos responsáveis pelo servidor local criado para autenticar e conectar a uma conta genérica do Gmail via OAuth, usada nos testes relacionados à obtenção de e-mails.

- gerarCNPJ.py:
    Script simples em Python para gerar números de CNPJ válidos, útil para testes em sistemas que verificam a validade da estrutura dos CNPJs inseridos.