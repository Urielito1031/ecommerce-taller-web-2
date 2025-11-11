/*
  Warnings:

  - A unique constraint covering the columns `[carritoId,productoId]` on the table `ItemCarrito` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[ItemCarrito] ADD CONSTRAINT [ItemCarrito_carritoId_productoId_key] UNIQUE NONCLUSTERED ([carritoId], [productoId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
