USE [Infinity]
GO

/****** Object:  StoredProcedure [dbo].[proc_logout]    Script Date: 3/5/2024 6:31:05 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE     PROCEDURE [dbo].[proc_logout]
	@p_usuario_id integer,
	@p_usuario_logado CHAR(1) = 'N'
AS
BEGIN
	BEGIN
		IF @p_usuario_id IS NULL OR @p_usuario_id = 0
			THROW 99999, 'O parâmetro @p_usuario_id é obrigatório!', 1;
	END

	BEGIN	
		UPDATE UsuarioSessao
		SET DataLoginInicio = GETDATE(), UsuarioLogado = @p_usuario_logado
		WHERE UsuarioId = @p_usuario_id AND UsuarioLogado = 'S';
	END
END
GO

