const fs = require('fs');

const loadArticles = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

const filterByKeyword = (articles, keyword) => {
    const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(keyword.toLowerCase()) ||
        article.description.toLowerCase().includes(keyword.toLowerCase())
    );
    console.log(`Filtered by keyword: ${filtered.length} articles`);
    return filtered;
};

const filterByDate = (articles, startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = articles.filter(article => {
        const pubDate = new Date(article.pub_date);
        return pubDate >= start && pubDate <= end;
    });
    console.log(`Filtered by date: ${filtered.length} articles`);
    return filtered;
};

const saveToFile = (data, filePath) => {
    const dir = filePath.substring(0, filePath.lastIndexOf('/'));
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
};

const main = () => {
    const inputPath = 'data/articles_with_entities.json';
    const keyword = 'samsung';  // Use a relevant keyword present in articles
    const startDate = '2024-01-01';  // Adjust the date range as needed
    const endDate = '2024-12-31';

    const articles = loadArticles(inputPath);
    console.log(`Loaded ${articles.length} articles`);

    let filteredArticles = filterByKeyword(articles, keyword);
    filteredArticles = filterByDate(filteredArticles, startDate, endDate);

    saveToFile(filteredArticles, 'data/filtered_articles.json');
    console.log(`Saved ${filteredArticles.length} filtered articles to data/filtered_articles.json`);
};

main();
