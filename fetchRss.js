const fs = require('fs');
const RSSParser = require('rss-parser');
const parser = new RSSParser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
  }
});

const loadConfig = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const fetchRssFeed = async (url) => {
  try {
    const feed = await parser.parseURL(url);
    return feed.items.map(item => ({
      title: item.title,
      description: item.contentSnippet,
      pub_date: item.pubDate,
      source_url: item.link
    }));
  } catch (error) {
    console.error(`Failed to fetch RSS feed from ${url}:`, error);
    return [];
  }
};

const fetchAllFeeds = async (configPath) => {
  const config = loadConfig(configPath);
  const rssFeeds = config.rss_feeds;

  let allArticles = [];
  for (const url of rssFeeds) {
    const articles = await fetchRssFeed(url);
    allArticles = allArticles.concat(articles);
  }
  
  return allArticles;
};

const saveToFile = (data, filePath) => {
  const dir = filePath.substring(0, filePath.lastIndexOf('/'));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
};

const main = async () => {
  const configPath = 'config.json';
  const articles = await fetchAllFeeds(configPath);
  saveToFile(articles, 'data/articles.json');
  console.log(`Saved ${articles.length} articles to data/articles.json`);
};

main();
