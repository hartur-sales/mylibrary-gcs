package com.mylibrary.library.repository;

import com.mylibrary.library.entities.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    List<Emprestimo> findByDataDevolucaoEfetivaIsNull();

    @Query("select e from Emprestimo e where e.dataDevolucaoPrevista < :hoje and e.dataDevolucaoEfetiva is null")
    List<Emprestimo> findAtrasados(LocalDate hoje);

    List<Emprestimo> findByLivroId(Long livroId);
}

