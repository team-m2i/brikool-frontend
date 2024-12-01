import React from 'react';
const services = [
    { 
        id: 1, 
        titre: 'Développement Web', 
        description: 'Création de sites modernes avec React et Node.js.', 
        prix: 500, 
        pathImage: 'https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_1280.png'
    },
    { 
        id: 2, 
        titre: 'Design Graphique', 
        description: 'Conception de logos, interfaces, et branding.', 
        prix: 300, 
        pathImage: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg'
    },
    { 
        id: 3, 
        titre: 'Rédaction de Contenu', 
        description: 'Rédaction d’articles SEO et contenu marketing.', 
        prix: 150, 
        pathImage: 'https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_1280.png'
    },
    { 
        id: 4, 
        titre: 'Marketing Digital', 
        description: 'Gestion de campagnes publicitaires en ligne.', 
        prix: 400, 
        pathImage: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg'
    },
    { 
        id: 5, 
        titre: 'Développement Web', 
        description: 'Création de sites modernes avec React et Node.js.', 
        prix: 500, 
        pathImage: 'https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_1280.png'
    },
    { 
        id: 6, 
        titre: 'Design Graphique', 
        description: 'Conception de logos, interfaces, et branding.', 
        prix: 300, 
        pathImage: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg'
    },
    { 
        id: 7, 
        titre: 'Rédaction de Contenu', 
        description: 'Rédaction d’articles SEO et contenu marketing.', 
        prix: 150, 
        pathImage: 'https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_1280.png'
    },
    { 
        id: 8, 
        titre: 'Marketing Digital', 
        description: 'Gestion de campagnes publicitaires en ligne.', 
        prix: 400, 
        pathImage: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg'
    },
];

export default function Freelancers() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Services Freelancers</h1>
            <div style={styles.grid}>
                {services.map((service) => (
                    <div key={service.id} style={styles.card}>
                        <img 
                            src={service.pathImage} 
                            alt={service.titre} 
                            style={styles.image} 
                        />
                        <h2>{service.titre}</h2>
                        {/* <p>{service.description}</p> */}
                        <p><strong>Prix:</strong> ${service.prix}</p>
                        <button style={styles.button}>Commander</button>
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
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '350px',
        margin: 'auto',
    },
    image: {
        width: '300px',
        height: '200px',
        borderRadius: '10px',
        marginBottom: '15px',
        objectFit: 'cover',
    },
    button: {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};