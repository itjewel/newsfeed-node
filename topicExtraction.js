const fs = require('fs');
const natural = require('natural');
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

const loadArticles = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

const extractTopics = (articles) => {
    articles.forEach(article => {
        const text = `${article.title} ${article.description}`;
        tfidf.addDocument(text);
    });

    articles.forEach((article, index) => {
        article.topics = tfidf.listTerms(index).map(item => item.term);
    });

    return articles;
};

const saveToFile = (data, filePath) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
};

const main = () => {
    const inputPath = 'data/articles.json';
    const articles = loadArticles(inputPath);

    const articlesWithTopics = extractTopics(articles);
    saveToFile(articlesWithTopics, 'data/articles_with_topics.json');
    console.log(`Saved articles with topics to data/articles_with_topics.json`);
};

main();
