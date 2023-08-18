Desafio de Desenvolvimento na AWS: RedSprite Light QuickStart - Compartilhamento de Arquivos com Senhas Únicas

Introdução:
Bem-vindo ao Desafio de Desenvolvimento AWS! Neste desafio, você irá construir uma aplicação chamada "RedSprite Light QuickStart" que permite o compartilhamento seguro de arquivos. A aplicação permitirá aos usuários fazer upload de arquivos, gerar senhas únicas para download e garantir que os arquivos sejam removidos após serem baixados uma única vez.

Passos do Desafio:

Passo 1: Configuração Inicial:

    Crie um bucket no Amazon S3 para armazenar os arquivos compartilhados.
    Configure um evento de gatilho no S3 para acionar uma função AWS Lambda sempre que um arquivo for carregado.

Passo 2: Desenvolvimento de Funções Lambda:

    Crie uma função Lambda chamada "GeneratePassword" que gera senhas únicas para os arquivos. Esta função deve criar uma senha aleatória e associá-la ao nome do arquivo.
    Crie uma função Lambda chamada "ShareFile" que gera um link de download para um arquivo com base na senha fornecida. Essa função deve associar a senha ao arquivo no S3 e retornar o link de download.

Passo 3: Implementação da Lógica de Compartilhamento:

    Desenvolva uma interface de usuário simples usando uma tecnologia web, como React ou Vue.js.
    Implemente a funcionalidade para que os usuários possam fazer upload de arquivos.
    Integre a interface de usuário com as funções Lambda "GeneratePassword" e "ShareFile" para gerar senhas e obter links de download.

Passo 4: Implementação de Senhas Únicas:

    Utilize o Amazon DynamoDB para armazenar as associações entre senhas e arquivos.
    Ao gerar senhas únicas, armazene-as no DynamoDB junto com o nome do arquivo correspondente.

Passo 5: Remoção Automática de Arquivos:

    Crie uma função Lambda chamada "DeleteFile" que é acionada por um evento de gatilho do DynamoDB.
    Configure essa função para remover o arquivo correspondente do S3 após o arquivo ter sido baixado.

Passo 6: Testes e Validação:

    Faça o upload de arquivos e verifique se senhas únicas estão sendo geradas corretamente.
    Teste o processo de compartilhamento, garantindo que os links de download funcionem e que os arquivos sejam removidos após o download.

Promoção do Desafio:
Participe do nosso Desafio de Desenvolvimento AWS e mostre suas habilidades na construção de uma aplicação de compartilhamento de arquivos altamente segura e eficiente! Compartilhe seus resultados nas redes sociais e inspire outros desenvolvedores a explorar as capacidades da AWS.

Ao completar este desafio, você terá adquirido habilidades em integração de serviços da AWS, segurança de compartilhamento de arquivos e desenvolvimento de aplicativos web modernos. Boa sorte e divirta-se construindo o RedSprite Light QuickStart! #AWSFileShareChallenge #SecureFileSharing
