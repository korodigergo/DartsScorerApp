<a id="readme-top"></a>

# Darts Counter

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation-with-docker">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<p>
  This is a Darts counter application to track and manage scores during a darts game. Users can select game modes(legs, sets, points), add players and choose from them for the next match. A leaderboard is also created to follow the performance of players, ranking them based on the number of wins they have achieved. The backend is powered by Java, Spring Boot with PostgreSQL as the database. The frontend is created using JavaScript and React, and the entire project is containerized using Docker .
</p>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![React][React.js]][React-url]
* [![Java][Java]][Java-url]
* [![SpringBoot][Springboot-shield]][Springboot-url]
* [![PostgreSQL][POSTGRESQL-shield]][POSTGRESQL-url]
* [![Docker][Docker-shield]][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
1. Install Docker on your computer

### Installation with Docker
1. Clone the repository
   ```sh
   git clone https://github.com/korodigergo/DartsScorerApp
   ```
2. Setup:
   Navigate to the backend folder in your terminal and give your environmental variables(DB_USERNAME, DB_PASSWORD, DB_URL)
3. Start Docker and run:
   ```sh
   docker-compose up
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

- Add new players using the input and the plus button.
- Select the desired legs, sets and points in the Game Settings
- Select the players by clicking on their names and press start
- Count the throws and submit the score 
- After the game check the leaderboard to know how many wins each player has 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

- **Gergő Kóródi** 
  - k.geri131@gmail.com 
  - [![LinkedIn - KorodiGergo][linkedin-shield]][linkedin-url_korodigergo]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/korodigergo/el-proyecte-grande-sprint-1-java-korodigergo.svg?style=for-the-badge
[contributors-url]: https://github.com/CodecoolGlobal/el-proyecte-grande-sprint-1-java-korodigergo/graphs/contributors

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url_korodigergo]: https://www.linkedin.com/in/korodi-gergo-235305271/


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[POSTGRESQL-shield]:https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white
[POSTGRESQL-url]:https://www.postgresql.org/
[Docker-shield]:https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]:https://www.docker.com/
[Springboot-shield]:https://img.shields.io/badge/SpringBoot-6DB33F?style=flat-square&logo=Spring&logoColor=white
[Springboot-url]:https://spring.io/projects/spring-boot
[Java]:https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white
[Java-url]:https://www.java.com/en/