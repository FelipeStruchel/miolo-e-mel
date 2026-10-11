<!--
Este texto é a documentação da subtask: preencha ENQUANTO a memória está fresca, antes de pedir review.
Os comentários como este não aparecem no PR; apague o que não se aplicar.
O TÍTULO do PR segue o padrão dos commits: tipo(escopo): o que mudou. Ex.: feat(api): criar rota de saúde
(ele vira a mensagem do commit na main).
-->

## Subtask

<!-- Qual subtask este PR entrega? Use "Closes #N" para o cartão ir para "Done" quando o PR for mergeado. -->

Closes #
Spec: SUB-0XX

## O que foi implementado

<!--
Em 3 a 6 tópicos, com as suas palavras: o que existe agora que não existia antes?
Cite os arquivos/pastas principais. Não cole código; diga o que cada parte faz.
-->

-

## Decisões e trade-offs

<!--
O que você escolheu que NÃO estava no passo a passo da spec, e por quê?
Se seguiu a spec ao pé da letra e nada mudou, escreva "Segui a spec sem alterações."
-->

-

## Como validei (cenário de teste para QA)

<!--
Passos que outra pessoa pode repetir para provar que funciona: dado [situação], quando [ação], então [resultado esperado].
Inclua os COMANDOS que você rodou e o que apareceu (ex.: curl http://localhost:3000/health -> {"status":"ok"}).
"Testei e funcionou" não vale: quem lê precisa conseguir repetir.

Exemplo preenchido (rota de saúde da api):
1. **Dado** a api rodando com `pnpm --filter api start:dev`,
2. **Quando** eu rodo `curl http://localhost:3000/health`,
3. **Então** a resposta é `{"status":"ok"}` (cole a saída do terminal, ou um print do Insomnia, logo abaixo).

Como registrar sem dar trabalho:
- Cole a saída do terminal como bloco de código, ou tire um print do Insomnia/navegador no momento em que testar (não depois).
- Escreva uma legenda curta dizendo o que o print prova ("token válido -> 200", "sem token -> 401").
- Se você pediu ajuda a uma IA para escrever o PR, cole nela a saída real do que você rodou: ela documenta o que foi feito, mas só registra o que foi testado se você mostrar o resultado.
- O CI verde não substitui isto: ele não sobe o Docker nem abre o app. Se a subtask pede, rode e registre você mesmo.
-->

1. **Dado** ...
2. **Quando** ...
3. **Então** ...

## Dificuldades encontradas

<!--
O que travou e como saiu? Mensagem de erro, o que você tentou, o que resolveu.
É a parte que mais ajuda o próximo (e você daqui a 6 meses). "Nenhuma" também é uma resposta válida, se for verdade.
-->

-

## Testes escritos

<!-- Quais arquivos de teste você criou/alterou, o que cada um cobre e a cobertura que apareceu no `test:cov`. -->

-

## Checklist

<!-- Marque só o que você realmente fez e conferiu. -->

- [ ] Os critérios de aceite (DoD) da spec estão atendidos
- [ ] `pnpm turbo run lint typecheck build test` passa na minha máquina
- [ ] Nenhum segredo, `.env` ou chave no commit (`git status` conferido)
- [ ] O título do PR e as mensagens dos commits seguem o padrão (`tipo(escopo): o que mudou`)
- [ ] Preenchi todas as seções acima (nada ficou com o texto de exemplo)
