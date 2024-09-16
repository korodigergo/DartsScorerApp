package com.codecool.dartsappbackend.service;

import com.codecool.dartsappbackend.controller.dto.NewPlayerDTO;
import com.codecool.dartsappbackend.controller.dto.PlayerDTO;
import com.codecool.dartsappbackend.repository.Player;
import com.codecool.dartsappbackend.repository.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<PlayerDTO> getAllPlayers() {
        List<Player> players = playerRepository.findAll();
        return players.stream().map((player -> new PlayerDTO(player.getId(), player.getPlayerName(), player.getWins()))).toList();
    }

    public List<PlayerDTO> getLeaderBoard() {
        List<Player> players = playerRepository.findAll();
        List<PlayerDTO> leaderBoard = new ArrayList<>(players.stream().map((player -> new PlayerDTO(player.getId(), player.getPlayerName(), player.getWins()))).toList());
        leaderBoard.sort((p1, p2) -> Integer.compare(p2.wins(), p1.wins()));
        return leaderBoard;
    }



    public String addNewPlayer(NewPlayerDTO newPlayerDTO) {
        Player player = new Player();
        player.setPlayerName(newPlayerDTO.playerName());
        player.setWins(0);
        playerRepository.save(player);
        return player.getPlayerName();
    }

    public String updatePlayer(long id, PlayerDTO playerDTO) {
        Player player = playerRepository
                .findById(id)
                .orElseThrow(RuntimeException::new);
        player.setWins(playerDTO.wins());
        return playerRepository.save(player).getPlayerName();
    }
}
