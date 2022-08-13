import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const milhoFarinhaPremix = await prisma.ingredientes.createMany({
    data: [{
      codigoIngrediente: "5698",
      descricaoIngrediente: 'Milho',
      }, {
      codigoIngrediente: "5697",
      descricaoIngrediente: 'Farinha',
      }, {
      codigoIngrediente: "5699",
      descricaoIngrediente: 'Premix',
      }
    ],
    })
    console.log({ milhoFarinhaPremix });

  const racaoCrescimentoAnimal = await prisma.receitas.create({
    data: {
      codigoReceita: "58964",
      descricaoReceita: "Ração crescimento inicial",
    }
  })
  console.log({racaoCrescimentoAnimal});

  const adicionaIngredientesNaReceita58964 = await prisma.receitasTemIngredientes.createMany({
    data: [{
      receitasCodigoReceita: "58964",
      ingredientesCodigoIngrediente: "5698",
      ordem: 1,
      previsto: 1000,
    }, {
      receitasCodigoReceita: "58964",
      ingredientesCodigoIngrediente: "5697",
      ordem: 2,
      previsto: 500,
    }, {
      receitasCodigoReceita: "58964",
      ingredientesCodigoIngrediente: "5699",
      ordem: 3,
      previsto: 250,
    }]
  })
  console.log({adicionaIngredientesNaReceita58964})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })