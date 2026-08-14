# MadeiraSobMedida - TODO

## Banco de Dados
- [x] Criar tabela produtos_base (tipo de móvel, taxa base)
- [x] Criar tabela materiais_cores (nome, multiplicador de preço, URL da imagem)
- [x] Criar tabela avaliacoes (nome cliente, nota, comentário)
- [x] Inserir dados iniciais de produtos, materiais e avaliações

## Backend
- [x] Criar rotas de API para listar produtos
- [x] Criar rotas de API para listar materiais/cores
- [x] Criar rotas de API para listar avaliações
- [x] Implementar lógica de cálculo de preço

## Frontend - Componentes Principais
- [x] Navbar fixo com logótipo, navegação e carrinho
- [x] Configurador de produto (lado esquerdo e direito)
- [x] Carrossel de imagens/cores interativo
- [x] Formulário de seleção de tipo de móvel
- [x] Campos de medidas (Comprimento, Largura/Profundidade, Altura)
- [x] Checkboxes de opções adicionais
- [x] Exibição de preço com desconto à vista e parcelamento
- [x] Botão "Encomendar via WhatsApp"

## Frontend - Seções Adicionais
- [x] Seção de Suporte com botão WhatsApp
- [x] Seção de Avaliações/Depoimentos
- [x] Rodapé com colunas de informações e redes sociais
- [x] Seção Hero/Início com CTA

## Design e Responsividade
- [x] Aplicar design elegante e sofisticado com cores âmbar/ouro
- [x] Garantir responsividade em todos os dispositivos
- [x] Implementar scroll suave

## Testes
- [x] Testes unitários do motor de cálculo de preço (8 testes passando)
- [x] Integração com WhatsApp em todos os componentes
- [x] Responsividade mobile e desktop

## Novo Escopo: Banco Neon e Painel ADM
- [ ] Configurar conexão com o PostgreSQL Neon (`DATABASE_URL`)
- [ ] Atualizar schema Drizzle para suportar tipos de móveis (quadradão vs linear por largura) e madeiras
- [ ] Criar procedimentos tRPC para login de administrador (user: thays, senha: ç1532)
- [ ] Criar procedimentos para CRUD de móveis base (tipo, categoria de cálculo: 'quadrado' ou 'linear', valor por metro quadrado ou taxa base)
- [ ] Criar procedimentos para CRUD de madeiras/cores (nome, multiplicador, URL de imagem)
- [ ] Criar procedimentos para salvar pedidos de orçamento dos clientes no banco
- [ ] Desenvolver painel administrativo protegido em rota secreta
- [ ] Atualizar o frontend e o configurador de móveis para refletir os dois tipos de cálculo de preço
