export async function getAllPlayers() {
  try {
    const response = await fetch("/api/players/all");
    const players = await response.json();
    setPlayers(players);
  } catch (error) {
    console.log(error);
  }
}