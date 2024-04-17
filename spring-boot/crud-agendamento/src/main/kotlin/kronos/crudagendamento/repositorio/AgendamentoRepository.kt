package kronos.crudagendamento.repositorio

import kronos.crudagendamento.dominio.Agendamento
import org.springframework.data.jpa.repository.JpaRepository

interface AgendamentoRepository: JpaRepository<Agendamento, Int>{
        findById(id:Int):List<Agendamento>
        findByStatus(status:Boolean):List<Agendamento>
        findByUsuario(usuario:Usuario):List<Agendamento>
        /*DEVE SER IDEALIZADA UMA BUSCA POR DATA, MAS COMO AINDA NÃO SEI FAZER ISSO, NÃO COLOQUEI!!!*/




}