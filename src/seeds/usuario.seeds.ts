const bcrypt = require('bcrypt');
const { PrismaClient, Gender } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  try {
    const seeds = [];
    for (let i = 1; i <= 100; i++) {
      const usuarioData = {
        email: `usuario${i}@example.com`,
        senha: await bcrypt.hash(`senha${i}`, 10),
        nome: `Nome ${i}`,
        telefone: `(123) 456-789${i}`,
        cpf: `${i}2345678901`,
        rg: `RG${i}2345`,
        dataNascimento: new Date('2023-10-12T15:26:42.581Z').toISOString(),
        logradouro: `Endereço ${i}`,
        uf: `UF${i}`,
        bairro: `Bairro ${i}`,
        cidade: `Cidade ${i}`,
        username: `usuario${i}`,
        gender: Gender.FEMININO,
      };
      seeds.push(usuarioData);
    }

    for (const usuarioData of seeds) {
      await prisma.usuario.create({
        data: usuarioData,
      });
    }

    console.log('Sementes de usuários inseridas com sucesso.');
  } catch (error) {
    console.error('Erro ao inserir sementes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
