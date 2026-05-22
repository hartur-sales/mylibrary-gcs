package com.mylibrary.library.service;

import com.mylibrary.library.entities.Livro;
import com.mylibrary.library.enums.StatusLivro;
import com.mylibrary.library.repository.LivroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LivroService {
    private final LivroRepository repo;

    public LivroService(LivroRepository repo) { this.repo = repo; }

    public Livro criar(Livro l) {
        l.setStatus(StatusLivro.DISPONIVEL);
        return repo.save(l);
    }

    public List<Livro> listar(Long categoriaId, StatusLivro status, String q) {
        return repo.filter(categoriaId, status, q);
    }

    public Livro buscar(Long id) { return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Livro não encontrado")); }

    public void excluir(Long id) {
        Livro l = buscar(id);
        if (l.getStatus() != StatusLivro.DISPONIVEL) throw new IllegalStateException("Só é possível excluir livro disponível");
        repo.delete(l);
    }
}

