package com.codecool.dartsappbackend.controller;

import com.codecool.dartsappbackend.controller.dto.NewPlayerDTO;
import com.codecool.dartsappbackend.controller.dto.PlayerDTO;
import com.codecool.dartsappbackend.repository.Player;
import com.codecool.dartsappbackend.service.PlayerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
public class PlayerController {
    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/all")
    public List<PlayerDTO> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @GetMapping("/leaderboard")
    public List<PlayerDTO> getLeaderBoard() {
        return playerService.getLeaderBoard();
    }

    @PostMapping()
    public String addNewPlayer(@RequestBody NewPlayerDTO newPlayerDTO) {
        return playerService.addNewPlayer(newPlayerDTO);
    }

    @PutMapping("/{playerId}")
    public String updatePlayer(@PathVariable long playerId, @RequestBody PlayerDTO playerDTO) {
        return playerService.updatePlayer(playerId, playerDTO);
    }

}
