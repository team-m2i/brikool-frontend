import React from 'react';

const freelancers = [
    {
        id: 1,
        titre: 'Développeur Web Full Stack',
        description:
            'Expert en développement web avec plus de 5 ans d’expérience. Spécialisé en React.js, Node.js, et MongoDB.',
        prix: '1500 €/mois',
        pathImage: 'https://via.placeholder.com/100?text=Web+Dev',
    },
    {
        id: 2,
        titre: 'Designer Graphique',
        description:
            'Designer expérimenté en création de logos, branding, et interfaces utilisateur modernes.',
        prix: '1200 €/projet',
        pathImage: 'https://via.placeholder.com/100?text=Graphic+Designer',
    },
    {
        id: 3,
        titre: 'Spécialiste SEO',
        description:
            'Aide votre site à atteindre les premières positions sur Google grâce à des techniques SEO avancées.',
        prix: '1000 €/mois',
        pathImage: 'https://via.placeholder.com/100?text=SEO+Expert',
    },
    {
        id: 4,
        titre: 'Rédacteur de Contenu',
        description:
            'Création de contenus engageants et optimisés pour le web, adaptés à votre audience cible.',
        prix: '500 €/article',
        pathImage: 'https://via.placeholder.com/100?text=Content+Writer',
    },
    {
        id: 5,
        titre: 'Développeur Web Full Stack',
        description:
            'Expert en développement web avec plus de 5 ans d’expérience. Spécialisé en React.js, Node.js, et MongoDB.',
        prix: '1500 €/mois',
        pathImage: 'https://via.placeholder.com/100?text=Web+Dev',
    },
    {
        id: 6,
        titre: 'Designer Graphique',
        description:
            'Designer expérimenté en création de logos, branding, et interfaces utilisateur modernes.',
        prix: '1200 €/projet',
        pathImage: 'https://via.placeholder.com/100?text=Graphic+Designer',
    },
    {
        id: 7,
        titre: 'Spécialiste SEO',
        description:
            'Aide votre site à atteindre les premières positions sur Google grâce à des techniques SEO avancées.',
        prix: '1000 €/mois',
        pathImage: 'https://via.placeholder.com/100?text=SEO+Expert',
    },
    {
        id: 8,
        titre: 'Rédacteur de Contenu',
        description:
            'Création de contenus engageants et optimisés pour le web, adaptés à votre audience cible.',
        prix: '500 €/article',
        pathImage: 'https://via.placeholder.com/100?text=Content+Writer',
    },
];

export default function Freelancers() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Nos Services</h1>
            <div style={styles.gridContainer}>
                {freelancers.map((freelancer) => (
                    <div key={freelancer.id} style={styles.card}>
                        <div style={styles.cardHeader}>
                            <img
                                src={freelancer.pathImage}
                                alt={freelancer.titre}
                                style={styles.image}
                            />
                            <div>
                                <h2 style={styles.titre}>{freelancer.titre}</h2>
                                <p style={styles.prix}>{freelancer.prix}</p>
                            </div>
                        </div>
                        <p style={styles.description}>{freelancer.description}</p>
                        <button style={styles.button}>Voir Détails</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px', // Ajoute un espace entre les cartes
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    },
    image: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        marginRight: '15px',
    },
    titre: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: 0,
        color: '#0070f3',
    },
    prix: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#4caf50',
        marginTop: '5px',
    },
    description: {
        fontSize: '14px',
        color: '#555',
        marginBottom: '15px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};
