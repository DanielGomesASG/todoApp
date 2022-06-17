# Todo App 

## Orientações do PDF
>É possível adicionar e deletar Listas;
>É possivel adicionar,deletar e editar tarefas de respectivas listas;
>Utilização do json-server com o fake backend;


###Do Uso e Tecnolgias:

> Optei por usar bootstrap por estar mais familiarizado, embora, ao ser pedido a versão mais atual do Angular(14.0.2), tive algumas incompatibilidades com ferramentas que uso na versão 12.x.x como a biblioteca Ngb-Bootsrap.
> Por não ser compatível com a versão atual, utilizei o bootsrap via cdn, na versão 4.6.1 e implementei alguns modais seguindo à orientação da própria documentação.
> Utilzo Cards pois considero de visão agradável como estilização.
> Incialmente, eu pretendia seccionar as listas em navbar, mas se mostrou incompativel, uma vez que o Angular usa componentes para navegar.
> Preferi o uso de formControls e formGroups, pois acredito serem de fácil validação para a proposta.
> Tambéms seria possível utilizar 2-way-databiding apenas via NgbModel, mas as validações precisaria de mais escopos.
> a API formbuilder também poderia ser utilizada, porém, os grupos de inputs eram pequenos.
> As classes bootsraps utilizadas foram navbar e card, não saindo muito deste contexto.
> deixei a navegação no component Todo, pois nele seria criado a ideia de home, e de lá "partiriam"modularizações e outras navegações se necessário.

###Git Clone e Ambiente Local:

> O Projeto está aberto no github, com o ultimo commit contendo o banco db.json original enviado via e-mail

> npm run db
> irá iniciar o pseudo banco dentro do projeto, na porta padrão do json-server: http://localhost:3000

> npm start
> irá iniciar a app angular na porta padrão: http://localhost:4200