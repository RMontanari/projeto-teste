package sptech.projetojpa1.repository

import org.springframework.data.jpa.repository.JpaRepository
import sptech.projetojpa1.dominio.Endereco

interface EnderecoRepository : JpaRepository<Endereco, Int> {
    fun findByCepContaining(cep: String): List<Endereco>
    fun findByBairroContaining(bairro: String): List<Endereco>
    fun findByUsuarioNomeContaining(nomeUsuario: String): List<Endereco>
    fun save(endereco: Endereco): Endereco
}