package sptech.projetojpa1.dominio

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank

@Entity
@Table(name = "statusAgendamento")
data class Status(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_status_agendamento")
    var id: Int?,

    @Column(name = "descricao", length = 30)
    @NotBlank
    var descricao: String?,

    @Column(name = "motivo", length = 200)
    var motivo: String?
)

