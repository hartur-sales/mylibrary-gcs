package com.mylibrary.library.repository;

import com.mylibrary.library.entities.Livro;
import com.mylibrary.library.enums.StatusLivro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface LivroRepository extends JpaRepository<Livro, Long> {
    List<Livro> findByCategoriaId(Long categoriaId);
    List<Livro> findByStatus(StatusLivro status);

    @Query("select l from Livro l where (:categoriaId is null or l.categoria.id = :categoriaId) " +
            "and (:status is null or l.status = :status) " +
            "and ( (:q is null) or lower(l.titulo) like lower(concat('%',:q,'%')) or lower(l.autor) like lower(concat('%',:q,'%')) )")
    List<Livro> filter(@Param("categoriaId") Long categoriaId, @Param("status") StatusLivro status, @Param("q") String q);
}

