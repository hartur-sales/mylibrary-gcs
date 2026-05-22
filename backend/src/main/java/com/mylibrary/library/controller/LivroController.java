package com.mylibrary.library.controller;

import com.mylibrary.library.entities.Livro;
import com.mylibrary.library.enums.StatusLivro;
import com.mylibrary.library.service.LivroService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/livros")
@CrossOrigin(origins = "http://localhost:4200")
public class LivroController {
    private final LivroService service;

    public LivroController(LivroService service) {
        this.service = service;
    }

    @GetMapping
    public List<Livro> listar(
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) StatusLivro status,
            @RequestParam(required = false) String q
    ) {
        return service.listar(categoriaId, status, q);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.buscar(id));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> criar(@Valid @RequestBody Livro l) {
        Livro saved = service.criar(l);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        try {
            service.excluir(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalStateException | IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
        }
    }
}