package com.codecool.dartsappbackend.controller;

import com.codecool.dartsappbackend.controller.dto.NewPlayerDTO;
import com.codecool.dartsappbackend.controller.dto.PlayerDTO;
import com.codecool.dartsappbackend.service.PlayerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class PlayerControllerTest {

    @Mock
    private PlayerService playerService;

    @InjectMocks
    private PlayerController playerController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllPlayersSuccess() {
        // Given
        PlayerDTO player1 = new PlayerDTO(1, "Player One", 0);
        PlayerDTO player2 = new PlayerDTO(2, "Player Two", 0);
        List<PlayerDTO> players = Arrays.asList(player1, player2);

        when(playerService.getAllPlayers()).thenReturn(players);

        // When
        List<PlayerDTO> result = playerController.getAllPlayers();
        System.out.println(result.size());
        // Then
        assertEquals(2, result.size());
        assertEquals("Player One", result.get(0).playerName());
        assertEquals("Player Two", result.get(1).playerName());
    }

    @Test
    public void testGetAllPlayersNoPlayers() {
        // Given
        when(playerService.getAllPlayers()).thenReturn(Arrays.asList());

        // When
        List<PlayerDTO> result = playerController.getAllPlayers();

        // Then
        assertEquals(0, result.size());
    }

    @Test
    public void testAddNewPlayerSuccess() {
        // Given
        NewPlayerDTO newPlayerDTO = new NewPlayerDTO("New Player", 0);
        String expectedResponse = "Player added successfully";
        when(playerService.addNewPlayer(newPlayerDTO)).thenReturn(expectedResponse);

        // When
        String result = playerController.addNewPlayer(newPlayerDTO);

        // Then
        assertEquals(expectedResponse, result);
    }

    @Test
    public void testAddNewPlayerFailure() {
        // Given
        NewPlayerDTO newPlayerDTO = new NewPlayerDTO("", 0); // Invalid player data
        String expectedResponse = "Invalid player data";
        when(playerService.addNewPlayer(newPlayerDTO)).thenReturn(expectedResponse);

        // When
        String result = playerController.addNewPlayer(newPlayerDTO);

        // Then
        assertEquals(expectedResponse, result);
    }
}

