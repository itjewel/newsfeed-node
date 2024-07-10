const fs = require('fs');
const nlp = require('compromise');

const loadArticles = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

const extractEntities = (text) => {
    const doc = nlp(text);
    const people = doc.people().out('array');
    const places = doc.places().out('array');
    const organizations = doc.organizations().out('array');
    
    return {
        people,
        places,
        organizations
    };
};

const addEntitiesToArticles = (articles) => {
    articles.forEach(article => {
        const text = `${article.title} ${article.description}`;
        article.entities = extractEntities(text);
    });

    return articles;
};

const saveToFile = (data, filePath) => {
    const dir = filePath.substring(0, filePath.lastIndexOf('/'));
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
};

const main = () => {
    const inputPath = 'data/articles_with_topics.json';
    const articles = loadArticles(inputPath);

    const articlesWithEntities = addEntitiesToArticles(articles);
    saveToFile(articlesWithEntities, 'data/articles_with_entities.json');
    console.log(`Saved articles with entities to data/articles_with_entities.json`);
};

main();
