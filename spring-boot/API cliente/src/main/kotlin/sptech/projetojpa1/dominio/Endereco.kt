package sptech.projetojpa1.dominio

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size

@Entity
data class Endereco(
    // Código do endereço
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_endereco")
    var codigo: Int?,
    // Logradouro do endereço
    @field:NotBlank(message = "Logradouro é obrigatório") var logradouro: String,
    // CEP do endereço
    @field:NotBlank(message = "CEP é obrigatório") @field:Size(
        max = 8,
        message = "CEP deve ter no máximo 8 caracteres"
    ) var cep: String,
    // Bairro do endereço
    var bairro: String?,
    // Cidade do endereço
    var cidade: String?,
    // Estado do endereço
    var estado: String?,

    )