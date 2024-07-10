# News Aggregator

## Overview

This project aggregates news articles from RSS feeds, persists the data, and extracts topics. Additional functionalities include filtering, named entity recognition, and periodic scheduling.

## Features

- Fetch news articles from RSS feeds
- Persist articles to JSON files
- Extract topics using keyword extraction
- Filter articles by keyword or date
- Extract named entities from articles
- Schedule periodic fetching and processing

## Setup

1. Initialize a Node.js project and install the required libraries:

   ```sh
   npm init -y
   npm install node-fetch rss-parser fs natural compromise
   ```

2. Fetch and process article:
   ```sh
   node fetchRss.js
   node topicExtraction.js
   node namedEntityRecognition.js
   ```

3. Filter articles:
   ```sh
   node filterArticles.js
   ```

## Usage

1. Customize RSS feed URLs in config.json to specify sources.
2. Modify filter criteria in filterArticles.js for specific article selection.
3. Explore advanced topic extraction and entity recognition techniques using libraries like `natural` and `compromise`.
