USE [Infinity]
GO

/****** Object:  StoredProcedure [dbo].[proc_contato_buscar]    Script Date: 3/19/2024 2:35:32 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE OR ALTER   PROCEDURE [dbo].[proc_contato_buscar]
	@p_usuario_id INT,
    @p_nome VARCHAR(50) = '',
    @p_celular VARCHAR(11) = ''
AS
BEGIN

	BEGIN
		IF(@p_usuario_id = NULL OR @p_usuario_id = '')
		THROW 99999, 'É Obrigatório informar o ID do usuário!', 1;
	END
	
	SELECT * 
	FROM Contatos
	WHERE UsuarioId = @p_usuario_id 
	AND (@p_nome = '' OR Nome = @p_nome)
	AND (@p_celular = '' OR Celular = @p_celular)

END
GO

