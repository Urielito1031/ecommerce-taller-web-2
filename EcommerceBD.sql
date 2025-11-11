INSERT INTO dbo.Categoria (nombre, icono) VALUES 
('ELECTRONICA', 'bi-tv-fill'),              -- Televisores / Audio
('COMPUTACION', 'bi-laptop'),               -- Laptops, Desktops
('TELEFONIA', 'bi-phone'),                  -- Celulares y Accesorios
('HOGAR_MUEBLES', 'bi-house-door-fill'),    -- Hogar y Muebles
('ELECTRODOMESTICOS', 'bi-washer'),         -- Lavadoras / Electrodomésticos grandes
('COCINA', 'bi-cup-fill'),                  -- Utensilios / Cocina
('ROPA', 'bi-tshirt-fill'),                 -- Ropa
('CALZADO', 'bi-bag-check-fill'),           -- Calzado / Bolsos
('ACCESORIOS', 'bi-watch'),                 -- Joyería / Relojes
('BELLEZA', 'bi-gem'),                      -- Maquillaje / Cuidado Personal
('DEPORTES', 'bi-bicycle'),                 -- Deportes
('FITNESS', 'bi-heart-pulse-fill'),         -- Gimnasio / Fitness
('SALUD', 'bi-bandaid-fill'),               -- Salud / Primeros Auxilios
('LIBROS', 'bi-book-fill'),                 -- Libros
('JUGUETES', 'bi-puzzle-fill'),             -- Juguetes
('AUTOMOTRIZ', 'bi-car-front-fill'),        -- Accesorios para Autos
('JARDIN', 'bi-tree-fill'),                 -- Jardín y Exteriores
('MASCOTAS', 'bi-paw-fill'),                -- Suministros para Mascotas
('OFICINA', 'bi-briefcase-fill'),           -- Oficina y Papelería
('OTROS', 'bi-box-seam');                   -- Otros/Varios



DECLARE @NoImageUrl nvarchar(1000) = '';
DECLARE @Precio float;
DECLARE @Stock int;
DECLARE @Nombre nvarchar(1000);


-- JUGUETES (ID 15) - 5 Productos
SET @Precio = 25.99; SET @Stock = 50; SET @Nombre = 'Set de Ladrillos de Construcción (1000 pzs)';
INSERT INTO dbo.Producto (nombre, descripcion, precio, imagenUrl, stock, categoriaId) VALUES (@Nombre, 'Kit avanzado de piezas compatibles con todas las marcas.', @Precio, @NoImageUrl, @Stock, 15);

SET @Precio = 12.00; SET @Stock = 80; SET @Nombre = 'Muñeco de Acción Articulado (Serie Alpha)';
INSERT INTO dbo.Producto (nombre, descripcion, precio, imagenUrl, stock, categoriaId) VALUES (@Nombre, 'Muñeco totalmente articulado con accesorios de combate.', @Precio, @NoImageUrl, @Stock, 15);

SET @Precio = 45.50; SET @Stock = 30; SET @Nombre = 'Robot Interactivo Programable';
INSERT INTO dbo.Producto (nombre, descripcion, precio, imagenUrl, stock, categoriaId) VALUES (@Nombre, 'Robot educativo que enseña lógica y programación básica.', @Precio, @NoImageUrl, @Stock, 15);

SET @Precio = 8.99; SET @Stock = 120; SET @Nombre = 'Peluches de Personajes Fantásticos';
INSERT INTO dbo.Producto (nombre, descripcion, precio, imagenUrl, stock, categoriaId) VALUES (@Nombre, 'Peluche suave de 30cm, ideal para coleccionar.', @Precio, @NoImageUrl, @Stock, 15);

SET @Precio = 18.00; SET @Stock = 60; SET @Nombre = 'Pista de Autos de Carreras con Loop';
INSERT INTO dbo.Producto (nombre, descripcion, precio, imagenUrl, stock, categoriaId) VALUES (@Nombre, 'Pista fácil de armar con un loop de 360 grados.', @Precio, @NoImageUrl, @Stock, 15);

-- COCINA (ID 6) - 2 Productos
SET @Precio = 32.75; SET @Stock = 40; SET @Nombre = 'Sartén Antiadherente de Cerámica 28cm';
INSERT INTO dbo.Producto (nombre, descripcion, precio, imagenUrl, stock, categoriaId) VALUES (@Nombre, 'Distribución uniforme de calor, libre de PFOA.', @Precio, @NoImageUrl, @Stock, 6);

SET @Precio = 75.00; SET @Stock = 25; SET @Nombre = 'Licuadora de Alta Potencia (1200W)';
INSERT INTO dbo.Producto (nombre, descripcion, precio, imagenUrl, stock, categoriaId) VALUES (@Nombre, 'Ideal para batidos, tritura hielo sin esfuerzo.', @Precio, @NoImageUrl, @Stock, 6);

-- ELECTRONICA (ID 1) - 2 Productos
SET @Precio = 150.99; SET @Stock = 15; SET @Nombre = 'Altavoz Bluetooth Portátil (Extra Bass)';
INSERT INTO dbo.Producto (nombre, descripcion, precio, imagenUrl, stock, categoriaId) VALUES (@Nombre, 'Resistente al agua, sonido nítido y potentes bajos.', @Precio, @NoImageUrl, @Stock, 1);

SET @Precio = 59.99; SET @Stock = 70; SET @Nombre = 'Cargador Rápido USB-C (60W)';
INSERT INTO dbo.Producto (nombre, descripcion, precio, imagenUrl, stock, categoriaId) VALUES (@Nombre, 'Carga cualquier dispositivo en la mitad de tiempo.', @Precio, @NoImageUrl, @Stock, 1);

-- JARDIN (ID 17) - 2 Productos
SET @Precio = 22.50; SET @Stock = 90; SET @Nombre = 'Set de Herramientas de Jardinería (3 pzs)';
INSERT INTO dbo.Producto (nombre, descripcion, precio, imagenUrl, stock, categoriaId) VALUES (@Nombre, 'Pala, rastrillo y cultivador con mango ergonómico.', @Precio, @NoImageUrl, @Stock, 17);

SET @Precio = 15.00; SET @Stock = 150; SET @Nombre = 'Semillas de Tomate Cherry Orgánicas';
INSERT INTO dbo.Producto (nombre, descripcion, precio, imagenUrl, stock, categoriaId) VALUES (@Nombre, 'Paquete con 100 semillas, alto rendimiento.', @Precio, @NoImageUrl, @Stock, 17);

-- LIBROS (ID 14) - 2 Productos
SET @Precio = 28.00; SET @Stock = 200; SET @Nombre = 'Novela de Ciencia Ficción: La Última Frontera';
INSERT INTO dbo.Producto (nombre, descripcion, precio, imagenUrl, stock, categoriaId) VALUES (@Nombre, 'Un viaje épico a través de la galaxia.', @Precio, @NoImageUrl, @Stock, 14);

SET @Precio = 19.50; SET @Stock = 300; SET @Nombre = 'Guía de Programación en TypeScript Avanzado';
INSERT INTO dbo.Producto (nombre, descripcion, precio, imagenUrl, stock, categoriaId) VALUES (@Nombre, 'Profundiza en tipos genéricos y patrones.', @Precio, @NoImageUrl, @Stock, 14);

-- OTROS (ID 20) - 2 Productos
SET @Precio = 5.99; SET @Stock = 500; SET @Nombre = 'Cinta Adhesiva Industrial (Doble Faz)';
INSERT INTO dbo.Producto (nombre, descripcion, precio, imagenUrl, stock, categoriaId) VALUES (@Nombre, 'Soporta hasta 10kg, 5 metros de largo.', @Precio, @NoImageUrl, @Stock, 20);

SET @Precio = 10.50; SET @Stock = 450; SET @Nombre = 'Batería Externa USB (10000mAh)';
INSERT INTO dbo.Producto (nombre, descripcion, precio, imagenUrl, stock, categoriaId) VALUES (@Nombre, 'Ideal para cargar el móvil dos veces.', @Precio, @NoImageUrl, @Stock, 20);

