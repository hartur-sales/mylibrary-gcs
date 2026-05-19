package com.mylibrary.library.controller;

import com.mylibrary.library.entities.Emprestimo;
import com.mylibrary.library.service.EmprestimoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emprestimos")
public class EmprestimoController {

    private final EmprestimoService service;

    public EmprestimoController(EmprestimoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Emprestimo> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/ativos")
    public List<Emprestimo> listarAtivos() {
        return service.listarAtivos();
    }

    @GetMapping("/atrasados")
    public List<Emprestimo> listarAtrasados() {
        return service.listarAtrasados();
    }

    @PostMapping("/emprestar")
    public ResponseEntity<?> emprestar(
            @RequestParam Long livroId,
            @Valid @RequestBody Emprestimo e
    ) {
        try {
            return ResponseEntity.ok(service.emprestar(livroId, e));
        } catch (IllegalStateException | IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/{id}/devolver")
    public ResponseEntity<?> devolver(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.devolver(id));
        } catch (IllegalStateException | IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}