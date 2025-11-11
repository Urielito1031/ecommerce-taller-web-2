/*
  Warnings:

  - You are about to drop the column `categoria` on the `Producto` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Producto] DROP COLUMN [categoria];
ALTER TABLE [dbo].[Producto] ADD [categoriaId] INT NOT NULL CONSTRAINT [Producto_categoriaId_df] DEFAULT 8;

-- CreateTable
CREATE TABLE [dbo].[Categoria] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    [icono] NVARCHAR(1000),
    CONSTRAINT [Categoria_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Categoria_nombre_key] UNIQUE NONCLUSTERED ([nombre])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Producto_categoriaId_idx] ON [dbo].[Producto]([categoriaId]);

-- AddForeignKey
ALTER TABLE [dbo].[Producto] ADD CONSTRAINT [Producto_categoriaId_fkey] FOREIGN KEY ([categoriaId]) REFERENCES [dbo].[Categoria]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
