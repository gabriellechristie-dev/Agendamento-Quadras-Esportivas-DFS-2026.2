# Regras do Projeto

## Objetivo

Definir padrões de desenvolvimento para manter qualidade, organização e facilidade de manutenção.

---

# Organização

- Seguir a estrutura definida no projeto.
- Não criar novas pastas sem comunicar a equipe.
- Manter cada funcionalidade dentro do seu módulo.
- Evitar alterações em arquivos de outros integrantes.

---

# Desenvolvimento

Cada integrante deve:

- Trabalhar somente na sua branch.
- Seguir o padrão existente.
- Testar suas alterações.
- Manter o código organizado.

---

# Banco de Dados

Alterações no banco devem:

- Ser comunicadas à equipe.
- Utilizar Prisma.
- Manter o schema organizado.
- Evitar conflitos.

---

# Commits

Os commits devem ser claros.

Exemplos:

```
implementa cadastro de jogadores
corrige validação de reservas
adiciona conexão prisma
```

Evitar:

```
mudanças
teste
alterações
```

---

# Pull Request

Antes de abrir um Pull Request:

- Testar funcionalidade.
- Verificar erros.
- Atualizar branch.
- Resolver conflitos.

---

# Padrão de Código

Obrigatório:

- Routes possuem somente rotas.
- Controllers controlam requisições.
- Services possuem regras de negócio.
- Configurações ficam em config.
- Evitar código duplicado.

---

# Responsabilidade da Equipe

Todos devem manter o projeto organizado para facilitar:

- Desenvolvimento.
- Revisão.
- Manutenção.
- Evolução do sistema.