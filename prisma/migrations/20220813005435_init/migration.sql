-- CreateTable
CREATE TABLE `receitas` (
    `codigo_receita` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao_receita` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`codigo_receita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingredientes` (
    `codigo_ingrediente` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao_ingrediente` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`codigo_ingrediente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `receitas_tem_ingredientes` (
    `receitas_codigo_receita` INTEGER NOT NULL,
    `ingredientes_codigo_ingrediente` INTEGER NOT NULL,
    `ordem` INTEGER NOT NULL,
    `previsto` INTEGER NOT NULL,

    PRIMARY KEY (`receitas_codigo_receita`, `ingredientes_codigo_ingrediente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `receitas_tem_ingredientes` ADD CONSTRAINT `receitas_tem_ingredientes_receitas_codigo_receita_fkey` FOREIGN KEY (`receitas_codigo_receita`) REFERENCES `receitas`(`codigo_receita`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receitas_tem_ingredientes` ADD CONSTRAINT `receitas_tem_ingredientes_ingredientes_codigo_ingrediente_fkey` FOREIGN KEY (`ingredientes_codigo_ingrediente`) REFERENCES `ingredientes`(`codigo_ingrediente`) ON DELETE RESTRICT ON UPDATE CASCADE;
