-- CreateTable
CREATE TABLE `receitas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_receita` VARCHAR(191) NOT NULL,
    `descricao_receita` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `receitas_codigo_receita_key`(`codigo_receita`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingredientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_ingrediente` VARCHAR(191) NOT NULL,
    `descricao_ingrediente` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ingredientes_codigo_ingrediente_key`(`codigo_ingrediente`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `receitas_tem_ingredientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `receitas_codigo_receita` VARCHAR(191) NOT NULL,
    `ingredientes_codigo_ingrediente` VARCHAR(191) NOT NULL,
    `ordem` INTEGER NOT NULL,
    `previsto` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `receitas_tem_ingredientes` ADD CONSTRAINT `receitas_tem_ingredientes_receitas_codigo_receita_fkey` FOREIGN KEY (`receitas_codigo_receita`) REFERENCES `receitas`(`codigo_receita`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receitas_tem_ingredientes` ADD CONSTRAINT `receitas_tem_ingredientes_ingredientes_codigo_ingrediente_fkey` FOREIGN KEY (`ingredientes_codigo_ingrediente`) REFERENCES `ingredientes`(`codigo_ingrediente`) ON DELETE RESTRICT ON UPDATE CASCADE;
