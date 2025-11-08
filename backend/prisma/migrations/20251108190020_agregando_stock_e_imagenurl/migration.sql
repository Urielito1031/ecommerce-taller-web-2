/*
  Warnings:

  - Added the required column `imagenUrl` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Producto] ADD [imagenUrl] NVARCHAR(1000) NOT NULL,
[stock] INT NOT NULL CONSTRAINT [Producto_stock_df] DEFAULT 1;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
