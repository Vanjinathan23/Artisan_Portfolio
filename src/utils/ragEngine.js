// ── ARTISANA RAG ENGINE ────────────────────────────────────────────────────
// TF-IDF cosine similarity retrieval. Pure JavaScript. No external libraries.
// Builds an index once on import, cached in memory for all subsequent calls.

import { knowledgeBase } from '../data/knowledgeBase.js';

// ── STOP WORDS ────────────────────────────────────────────────────────────────

const stopWords = new Set([
  'the','and','for','are','but','not','you','all','any','can',
  'had','her','was','one','our','out','day','get','has','him',
  'his','how','its','may','new','now','old','see','two','way',
  'who','boy','did','its','let','put','say','she','too','use',
  'that','this','with','have','from','they','will','been','does',
  'each','from','into','like','more','also','been','than','then',
  'them','what','when','your','about','their','there','these',
  'which','would','could','other','after','first','never','where',
  'those','every','being','should','before','because','between',
  'through','during','within','without','towards'
]);

// ── TOKENIZER ────────────────────────────────────────────────────────────────

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2)
    .filter(t => !stopWords.has(t));
}

// ── TF-IDF MATH ───────────────────────────────────────────────────────────────

function computeTF(tokens) {
  const tf = {};
  tokens.forEach(t => { tf[t] = (tf[t] || 0) + 1; });
  const len = tokens.length;
  Object.keys(tf).forEach(t => { tf[t] = tf[t] / len; });
  return tf;
}

function computeIDF(allTokenSets) {
  const idf = {};
  const N = allTokenSets.length;
  const allTerms = new Set(allTokenSets.flat());
  allTerms.forEach(term => {
    const docsWithTerm = allTokenSets.filter(ts => ts.includes(term)).length;
    idf[term] = Math.log((N + 1) / (docsWithTerm + 1)) + 1;
  });
  return idf;
}

function computeTFIDF(tf, idf) {
  const tfidf = {};
  Object.keys(tf).forEach(t => {
    tfidf[t] = tf[t] * (idf[t] || 1);
  });
  return tfidf;
}

function cosineSimilarity(vecA, vecB) {
  const allKeys = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
  let dot = 0, magA = 0, magB = 0;
  allKeys.forEach(k => {
    const a = vecA[k] || 0;
    const b = vecB[k] || 0;
    dot += a * b;
    magA += a * a;
    magB += b * b;
  });
  const mag = Math.sqrt(magA) * Math.sqrt(magB);
  return mag === 0 ? 0 : dot / mag;
}

// ── BUILD INDEX ON IMPORT (runs once, cached) ─────────────────────────────────

let _index = null;

function buildIndex() {
  if (_index) return _index;

  // Tokenize all documents
  const tokenSets = knowledgeBase.map(doc =>
    tokenize(doc.title + ' ' + doc.body)
  );

  // Compute global IDF
  const idf = computeIDF(tokenSets);

  // Compute TF-IDF vector for each document
  const vectors = tokenSets.map(tokens => {
    const tf = computeTF(tokens);
    return computeTFIDF(tf, idf);
  });

  _index = { idf, vectors };
  return _index;
}

// ── PUBLIC API: retrieve(query, topN) ─────────────────────────────────────────

export function retrieve(query, topN = 4) {
  const { idf, vectors } = buildIndex();

  // Vectorize the query
  const queryTokens = tokenize(query);
  const queryTF = computeTF(queryTokens);
  const queryVec = computeTFIDF(queryTF, idf);

  // Score all documents
  const scored = knowledgeBase.map((doc, i) => ({
    doc,
    score: cosineSimilarity(queryVec, vectors[i])
  }));

  // Sort by score descending, return top N with score > 0
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map(s => s.doc);
}

// ── KEYWORD BOOST: exact category / piece name boost ──────────────────────────
// If query contains a known piece name or category word,
// boost those documents to the top of results.

export function retrieveWithBoost(query, topN = 5) {
  const baseResults = retrieve(query, topN * 2);
  const queryLower = query.toLowerCase();

  const boosted = baseResults.map(doc => {
    let boost = 0;
    if (queryLower.includes(doc.category)) boost += 2;
    if (queryLower.includes(doc.title.toLowerCase())) boost += 3;

    const pieceNames = [
      'morning calm', 'ember ring', 'gold drift', 'rainy season',
      'first light', 'woven dusk', 'silk memory', 'earth vessel',
      'midnight cup'
    ];
    pieceNames.forEach(name => {
      if (queryLower.includes(name) && doc.body.toLowerCase().includes(name)) {
        boost += 4;
      }
    });
    return { doc, boost };
  });

  boosted.sort((a, b) => b.boost - a.boost);
  return boosted.slice(0, topN).map(b => b.doc);
}
