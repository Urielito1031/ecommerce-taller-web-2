BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Producto] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    [descripcion] NVARCHAR(1000) NOT NULL,
    [categoria] NVARCHAR(1000) NOT NULL,
    [precio] FLOAT(53) NOT NULL,
    [creadoEn] DATETIME2 NOT NULL CONSTRAINT [Producto_creadoEn_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Producto_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Carrito] (
    [id] INT NOT NULL IDENTITY(1,1),
    [usuarioId] INT NOT NULL,
    [creadoEn] DATETIME2 NOT NULL CONSTRAINT [Carrito_creadoEn_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Carrito_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Carrito_usuarioId_key] UNIQUE NONCLUSTERED ([usuarioId])
);

-- CreateTable
CREATE TABLE [dbo].[ItemCarrito] (
    [id] INT NOT NULL IDENTITY(1,1),
    [carritoId] INT NOT NULL,
    [productoId] INT NOT NULL,
    [cantidad] INT NOT NULL CONSTRAINT [ItemCarrito_cantidad_df] DEFAULT 1,
    CONSTRAINT [ItemCarrito_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Carrito] ADD CONSTRAINT [Carrito_usuarioId_fkey] FOREIGN KEY ([usuarioId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ItemCarrito] ADD CONSTRAINT [ItemCarrito_carritoId_fkey] FOREIGN KEY ([carritoId]) REFERENCES [dbo].[Carrito]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ItemCarrito] ADD CONSTRAINT [ItemCarrito_productoId_fkey] FOREIGN KEY ([productoId]) REFERENCES [dbo].[Producto]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
