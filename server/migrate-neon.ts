import { neon } from '@neondatabase/serverless';

const connectionString = "postgresql://neondb_owner:npg_rseUCT7bJp5i@ep-plain-wave-axmrue4r-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(connectionString);

async function runMigration() {
  console.log("Iniciando migração e verificação de colunas no Neon...");

  try {
    // 1. Tabela produtos_base
    await sql`
      CREATE TABLE IF NOT EXISTS produtos_base (
        id SERIAL PRIMARY KEY,
        tipo VARCHAR(100) NOT NULL UNIQUE,
        tipo_calculo VARCHAR(50) DEFAULT 'quadrado' NOT NULL,
        valor_base NUMERIC(10, 2) NOT NULL,
        descricao TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;
    await sql`ALTER TABLE produtos_base ADD COLUMN IF NOT EXISTS tipo_calculo VARCHAR(50) DEFAULT 'quadrado' NOT NULL;`;
    await sql`ALTER TABLE produtos_base ADD COLUMN IF NOT EXISTS valor_base NUMERIC(10, 2);`;
    await sql`ALTER TABLE produtos_base ADD COLUMN IF NOT EXISTS taxa_base NUMERIC(10, 2);`; // garantir compatibilidade com coluna legada
    await sql`ALTER TABLE produtos_base ADD COLUMN IF NOT EXISTS descricao TEXT;`;
    await sql`ALTER TABLE produtos_base ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL;`;
    await sql`ALTER TABLE produtos_base ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL;`;

    // Sincronizar valor_base e taxa_base se necessário
    await sql`UPDATE produtos_base SET valor_base = taxa_base WHERE valor_base IS NULL AND taxa_base IS NOT NULL;`;
    await sql`UPDATE produtos_base SET taxa_base = valor_base WHERE taxa_base IS NULL AND valor_base IS NOT NULL;`;

    // 2. Tabela materiais_cores
    await sql`
      CREATE TABLE IF NOT EXISTS materiais_cores (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL UNIQUE,
        multiplicador NUMERIC(5, 2) NOT NULL,
        url_imagem TEXT NOT NULL,
        descricao TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;
    await sql`ALTER TABLE materiais_cores ADD COLUMN IF NOT EXISTS url_imagem TEXT;`;
    await sql`ALTER TABLE materiais_cores ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL;`;
    await sql`ALTER TABLE materiais_cores ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL;`;

    // 3. Tabela avaliacoes
    await sql`
      CREATE TABLE IF NOT EXISTS avaliacoes (
        id SERIAL PRIMARY KEY,
        nome_cliente VARCHAR(100) NOT NULL,
        nota INTEGER NOT NULL,
        comentario TEXT NOT NULL,
        url_avatar TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;
    await sql`ALTER TABLE avaliacoes ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL;`;
    await sql`ALTER TABLE avaliacoes ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL;`;

    // 4. Tabela pedidos_orcamento
    await sql`
      CREATE TABLE IF NOT EXISTS pedidos_orcamento (
        id SERIAL PRIMARY KEY,
        nome_cliente VARCHAR(150),
        telefone_cliente VARCHAR(50),
        tipo_movel VARCHAR(100) NOT NULL,
        tipo_calculo VARCHAR(50) NOT NULL,
        material_cor VARCHAR(100) NOT NULL,
        comprimento NUMERIC(10, 2),
        largura NUMERIC(10, 2),
        altura NUMERIC(10, 2),
        opcionais TEXT,
        preco_total NUMERIC(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pendente' NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;
    await sql`ALTER TABLE pedidos_orcamento ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL;`;

    // Inserir dados iniciais se vazio
    const prodCount = await sql`SELECT count(*) FROM produtos_base;`;
    if (Number(prodCount[0].count) === 0) {
      await sql`
        INSERT INTO produtos_base (tipo, tipo_calculo, valor_base, taxa_base, descricao) VALUES
        ('Gabinete de Cozinha', 'quadrado', 450.00, 450.00, 'Gabinete robusto com gavetas e portas em MDF resistente à umidade.'),
        ('Gaveteiro', 'quadrado', 380.00, 380.00, 'Gaveteiro planejado com corrediças telescópicas e amortecimento.'),
        ('Pia', 'linear', 520.00, 520.00, 'Bancada e acabamento de pia sob medida com reforço estrutural.'),
        ('Armário', 'quadrado', 420.00, 420.00, 'Armário multiuso de alto padrão com prateleiras ajustáveis.'),
        ('Painel', 'quadrado', 350.00, 350.00, 'Painel decorativo para TV e ambientes integrados com passa-fios.');
      `;
      console.log("Produtos base inseridos com sucesso.");
    }

    const matCount = await sql`SELECT count(*) FROM materiais_cores;`;
    if (Number(matCount[0].count) === 0) {
      await sql`
        INSERT INTO materiais_cores (nome, multiplicador, url_imagem, descricao) VALUES
        ('Freijó', 1.15, 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=600&h=400&fit=crop', 'Madeira nobre com tonalidade acolhedora e veios marcantes.'),
        ('Imbuia', 1.25, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop', 'Tom escuro sofisticado e clássico para ambientes refinados.'),
        ('Carvalho', 1.20, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop', 'Alta durabilidade e visual contemporâneo escandinavo.'),
        ('Branco MDF', 1.00, 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&h=400&fit=crop', 'Acabamento clean, versátil e de fácil limpeza.');
      `;
      console.log("Materiais inseridos com sucesso.");
    }

    const avalCount = await sql`SELECT count(*) FROM avaliacoes;`;
    if (Number(avalCount[0].count) === 0) {
      await sql`
        INSERT INTO avaliacoes (nome_cliente, nota, comentario, url_avatar) VALUES
        ('Carlos Eduardo', 5, 'Simplesmente perfeito! O móvel ficou exatamente como planejei e a qualidade da madeira é espetacular.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop'),
        ('Mariana Souza', 5, 'Atendimento impecável e entrega antes do prazo. Recomendo muito a S&F Ambientes Planejados!', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop'),
        ('Roberto Sampaio', 5, 'Alto padrão de verdade. As ferragens com amortecimento e o acabamento do Freijó superaram minhas expectativas.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop');
      `;
      console.log("Avaliações inseridas com sucesso.");
    }

    console.log("Migração e seed do Neon concluídos com sucesso!");
  } catch (error) {
    console.error("Erro ao migrar tabelas no Neon:", error);
    process.exit(1);
  }
}

runMigration();
