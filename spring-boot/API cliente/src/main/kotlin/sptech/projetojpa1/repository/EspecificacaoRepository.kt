package sptech.projetojpa1.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import sptech.projetojpa1.dominio.Especificacao

interface EspecificacaoRepository : JpaRepository<Especificacao, Int> {
//    fun findByFkProcedimentoDescricao(descricao: String): List<Especificacao>
    fun findByEspecificacaoContainsIgnoreCase(especificacao: String): Especificacao?

//    @Query("DELETE FROM Especificacao e WHERE lower(e.especificacao) = lower(:especificacao)")
//    fun deleteByEspecificacaoIgnoreCase(especificacao: String)

    @Query("SELECT e.foto FROM Especificacao e WHERE e.idEspecificacaoProcedimento = :codigo")
    fun findFotoByCodigo(codigo: Int): ByteArray?

    @Query(
        """
        SELECT SUM(ep.precoColocacao + ep.precoManutencao + ep.precoRetirada) AS receitaTotal 
        FROM Agendamento a 
        INNER JOIN EspecificacaoProcedimento ep ON a.fkProcedimento = ep.idEspecificacaoProcedimento 
        WHERE a.data >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        """,
        nativeQuery = true
    )
    fun findReceitaSemestralAcumulada(): Double?
}
