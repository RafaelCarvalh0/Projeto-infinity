USE [Infinity]
GO

/****** Object:  StoredProcedure [dbo].[proc_contato_salvar_lista]    Script Date: 3/24/2024 6:44:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


----SELECT * FROM Contatos

--EXEC [dbo].[proc_contato_salvar_lista]
--	@p_usuario_id = 5,
--	@p_contato_json = '
--     [
--        {"Nome": "caloooooooooooooooo", "Celular": "11368902"},
--        {"Nome": "caliaaaaaaaaaaaaaaa", "Celular": "98765511"}
      
--    ]
--'

CREATE OR ALTER   PROCEDURE [dbo].[proc_contato_salvar_lista]
	@p_usuario_id INT,
    @p_contato_json NVARCHAR(MAX)
AS
BEGIN
	
	BEGIN
		IF @p_usuario_id IS NULL OR @p_usuario_id = 0
			THROW 99999, 'É Obrigatório informar o id do usuário!', 1;
	END
	
	DECLARE @Nome VARCHAR(100), @Celular VARCHAR(11);
	DECLARE @ContatosInseridos INT = 0, @ContatosExistentes INT = 0;
	
	DECLARE @contato CURSOR
	SET @contato = CURSOR FOR
	SELECT * FROM OPENJSON(@p_contato_json, N'lax $') WITH (Nome VARCHAR(100),
																	 Celular VARCHAR(11))
	
	OPEN @contato
	FETCH NEXT 
	FROM @contato INTO @Nome,
					   @Celular
	
	WHILE @@FETCH_STATUS = 0
	BEGIN
	
		IF NOT EXISTS (SELECT 1 FROM Contatos WHERE Celular = @Celular AND UsuarioId = @p_usuario_id)
			BEGIN
				INSERT INTO Contatos (UsuarioId, Nome, Celular, DataInclusao) 
				VALUES (@p_usuario_id, @Nome, @Celular, GETDATE());
				SET @ContatosInseridos += 1; 
			END;
		ELSE
            SET @ContatosExistentes += 1;
	

		FETCH NEXT 
		FROM @contato INTO @Nome,
						   @Celular
	
	END
	CLOSE @contato
	DEALLOCATE @contato

	SELECT @ContatosInseridos AS 'ContatosInseridos', @ContatosExistentes AS 'ContatosExistentes';

END
GO

