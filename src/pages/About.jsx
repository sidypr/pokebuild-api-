function About() {
  return (
    <main className="main">
      <div className="about-container">
        <h1 className="about-title">À Propos</h1>
        
        <div className="about-content">
          <div className="profile-section">
            <h2>Développeur</h2>
            <div className="developer-info">
              <p className="developer-name">Sidy DJIMBIRA</p>
              <p className="developer-title">Développeur Full Stack React/Node.js</p>
              
              <div className="social-links">
                <a 
                  href="https://www.linkedin.com/in/sidy-djimbira-118471223/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link linkedin"
                >
                  <i className="fab fa-linkedin"></i>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="project-section">
            <h2>À propos du projet</h2>
            <p className="project-description">
              Ce Pokédex est une application web interactive développée avec React. 
              Elle permet aux utilisateurs d'explorer l'univers Pokémon de manière 
              intuitive et détaillée.
            </p>

            <div className="features-section">
              <h3>Fonctionnalités principales :</h3>
              <ul>
                <li>Consultation détaillée des Pokémon</li>
                <li>Recherche par nom</li>
                <li>Filtrage par type avec code couleur</li>
                <li>Génération d'équipes équilibrées</li>
                <li>Guide complet des types</li>
                <li>Interface responsive et moderne</li>
              </ul>
            </div>

            <div className="technical-section">
              <h3>Technologies utilisées :</h3>
              <ul>
                <li>React (Hooks, Router)</li>
                <li>CSS Modules</li>
                <li>API PokéBuild</li>
                <li>Vite</li>
              </ul>
            </div>

            <div className="development-steps">
              <h3>Étapes du développement :</h3>
              <ol>
                <li>
                  <strong>Phase 1 : Configuration initiale</strong>
                  <p>Mise en place de l'environnement React avec Vite</p>
                </li>
                <li>
                  <strong>Phase 2 : Structure de base</strong>
                  <p>Création des composants principaux et du routing</p>
                </li>
                <li>
                  <strong>Phase 3 : Intégration de l'API</strong>
                  <p>Connexion avec l'API PokéBuild et gestion des données</p>
                </li>
                <li>
                  <strong>Phase 4 : Fonctionnalités principales</strong>
                  <p>Implémentation de la recherche et du filtrage</p>
                </li>
                <li>
                  <strong>Phase 5 : Équipes aléatoires</strong>
                  <p>Ajout de la génération d'équipes équilibrées</p>
                </li>
                <li>
                  <strong>Phase 6 : Guide des types</strong>
                  <p>Création du guide détaillé des types Pokémon</p>
                </li>
                <li>
                  <strong>Phase 7 : Design et UX</strong>
                  <p>Amélioration de l'interface utilisateur et de l'expérience</p>
                </li>
                <li>
                  <strong>Phase 8 : Optimisation</strong>
                  <p>Optimisation des performances et du code</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About; 