USE [Infinity]
GO

/****** Object:  StoredProcedure [dbo].[proc_contato_excluir_todos]    Script Date: 3/24/2024 6:44:18 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


--SELECT * FROM Contatos

CREATE OR ALTER   PROCEDURE [dbo].[proc_contato_excluir_todos]
	@p_usuario_id INT,
	@p_senha NVARCHAR(50)
AS
BEGIN
	BEGIN TRAN

		BEGIN TRY
			BEGIN
				IF @p_usuario_id IS NULL OR @p_usuario_id = 0
					THROW 99999, 'É Obrigatório informar o id do usuário!', 1;
			END

			DECLARE @hashed_password VARBINARY(256) = HASHBYTES('SHA2_256', @p_senha);

			IF EXISTS (SELECT 1 FROM Usuarios WHERE Id = @p_usuario_id AND Senha = @hashed_password)
			BEGIN
				DELETE FROM Contatos WHERE UsuarioId = @p_usuario_id
			END

			ELSE
				THROW 99999, 'Senha do usuário não confere!', 1;	

			END TRY
		BEGIN CATCH

            IF @@TRANCOUNT > 0  
               ROLLBACK TRAN

			DECLARE @ErrorMessage NVARCHAR(4000);
			DECLARE @ErrorSeverity INT;
			DECLARE @ErrorState INT;

			SELECT
				@ErrorMessage = ERROR_MESSAGE(),
				@ErrorSeverity = ERROR_SEVERITY(),
				@ErrorState = ERROR_STATE();

			-- Use RAISERROR inside the CATCH block to return error
			-- information about the original error that caused
			-- execution to jump to the CATCH block.
			RAISERROR (@ErrorMessage, -- Message text.
					   @ErrorSeverity, -- Severity.
					   @ErrorState -- State.
					   );

		END CATCH;

	IF @@TRANCOUNT > 0  
		COMMIT TRAN;
END
GO

