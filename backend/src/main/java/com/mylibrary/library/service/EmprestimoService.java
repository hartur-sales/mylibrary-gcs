package com.mylibrary.library.service;

import com.mylibrary.library.entities.Emprestimo;
import com.mylibrary.library.entities.Livro;
import com.mylibrary.library.enums.StatusLivro;
import com.mylibrary.library.repository.EmprestimoRepository;
import com.mylibrary.library.repository.LivroRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmprestimoService {

    private final EmprestimoRepository empreRepo;
    private final LivroRepository livroRepo;

    public EmprestimoService(EmprestimoRepository empreRepo, LivroRepository livroRepo) {
        this.empreRepo = empreRepo;
        this.livroRepo = livroRepo;
    }

    @Transactional
    public Emprestimo emprestar(Long livroId, Emprestimo e) {

        Livro l = livroRepo.findById(livroId)
                .orElseThrow(() -> new IllegalArgumentException("Livro não encontrado"));

        if (l.getStatus() != StatusLivro.DISPONIVEL) {
            throw new IllegalStateException("Livro já está emprestado");
        }

        e.setLivro(l);
        e.setDataEmprestimo(LocalDate.now());

        Emprestimo saved = empreRepo.save(e);

        l.setStatus(StatusLivro.EMPRESTADO);
        livroRepo.save(l);

        return saved;
    }

    @Transactional
    public Emprestimo devolver(Long emprestimoId) {

        Emprestimo e = empreRepo.findById(emprestimoId)
                .orElseThrow(() -> new IllegalArgumentException("Empréstimo não encontrado"));

        if (e.getDataDevolucaoEfetiva() != null) {
            throw new IllegalStateException("Empréstimo já devolvido");
        }

        Livro l = e.getLivro();

        if (l.getStatus() != StatusLivro.EMPRESTADO) {
            throw new IllegalStateException("Livro não está emprestado");
        }

        e.setDataDevolucaoEfetiva(LocalDate.now());
        empreRepo.save(e);

        l.setStatus(StatusLivro.DISPONIVEL);
        livroRepo.save(l);

        return e;
    }

    public List<Emprestimo> listarTodos() {
        return empreRepo.findAll();
    }

    public List<Emprestimo> listarAtivos() {
        return empreRepo.findByDataDevolucaoEfetivaIsNull();
    }

    public List<Emprestimo> listarAtrasados() {
        return empreRepo.findAtrasados(LocalDate.now());
    }

    public List<Emprestimo> listarPorLivro(Long livroId) {
        return empreRepo.findByLivroId(livroId);
    }
}