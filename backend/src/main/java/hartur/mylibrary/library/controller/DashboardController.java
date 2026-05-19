package com.mylibrary.library.controller;

import com.mylibrary.library.entities.Emprestimo;
import com.mylibrary.library.entities.Livro;
import com.mylibrary.library.repository.EmprestimoRepository;
import com.mylibrary.library.repository.LivroRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mylibrary.library.enums.StatusLivro;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final LivroRepository livroRepo;
    private final EmprestimoRepository empreRepo;

    public DashboardController(LivroRepository livroRepo, EmprestimoRepository empreRepo) {
        this.livroRepo = livroRepo; this.empreRepo = empreRepo;
    }

    @GetMapping
    public Map<String, Object> stats() {
        List<Livro> all = livroRepo.findAll();
        long total = all.size();
        long disponiveis = all.stream().filter(l -> l.getStatus() != null && l.getStatus() == StatusLivro.DISPONIVEL).count();
        long emprestados = all.stream().filter(l -> l.getStatus() != null && l.getStatus().name().equals("EMPRESTADO")).count();
        List<Emprestimo> ativos = empreRepo.findByDataDevolucaoEfetivaIsNull();

        Map<String, Object> m = new HashMap<>();
        m.put("totalLivros", total);
        m.put("livrosDisponiveis", disponiveis);
        m.put("livrosEmprestados", emprestados);
        m.put("emprestimosAtivos", ativos.size());
        m.put("ultimosEmprestimos", empreRepo.findAll().stream().sorted((a,b)->b.getDataEmprestimo().compareTo(a.getDataEmprestimo())).limit(5).toList());
        return m;
    }
}

