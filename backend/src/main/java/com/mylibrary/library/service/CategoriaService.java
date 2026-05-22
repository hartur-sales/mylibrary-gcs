package com.mylibrary.library.service;

import com.mylibrary.library.entities.Categoria;
import com.mylibrary.library.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {
    private final CategoriaRepository repo;

    public CategoriaService(CategoriaRepository repo) { this.repo = repo; }

    public List<Categoria> listar() { return repo.findAll(); }

    public Categoria criar(Categoria c) {
        repo.findByNome(c.getNome()).ifPresent(existing -> { throw new IllegalArgumentException("Nome de categoria já existe"); });
        return repo.save(c);
    }

    public void excluir(Long id) {
        Categoria c = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));
        if (c.getLivros() != null && !c.getLivros().isEmpty()) throw new IllegalStateException("Categoria possui livros vinculados");
        repo.delete(c);
    }
}

