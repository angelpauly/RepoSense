# 🚀 RepoSense – AI-Powered Repository Intelligence Platform

RepoSense is an AI-powered code understanding platform that allows developers to analyze any public GitHub repository and ask natural language questions about the codebase.

Instead of manually searching through hundreds of files, RepoSense retrieves the most relevant code snippets using Retrieval-Augmented Generation (RAG) and answers developer questions with contextual explanations.

---

## ✨ Features

- Clone any public GitHub repository
- Automatically extract source code files
- Intelligent code chunking
- Generate semantic vector embeddings using Gemini
- Store embeddings in ChromaDB
- Perform fast semantic similarity search
- RAG-based repository question answering
- AI-generated explanations using Gemini

---

## 🏗️ System Architecture

``
                GitHub Repository URL
                         │
                         ▼
                 Clone Repository
                         │
                         ▼
             Extract Source Code Files
                         │
                         ▼
                  Chunk Source Code
                         │
                         ▼
          Generate Embeddings (Gemini)
                         │
                         ▼
              Store in ChromaDB
                         │
                         ▼
                 User Question
                         │
                         ▼
         Generate Query Embedding
                         │
                         ▼
        Semantic Search (Top-K Chunks)
                         │
                         ▼
         Build Context (RAG Pipeline)
                         │
                         ▼
            Gemini generates Answer
                         │
                         ▼
                 Response to User
``

---

# 🧠 Technologies Used

### Frontend

- React

### Backend

- Node.js
- Express.js

### AI

- Google Gemini API
- Gemini Embedding Model
- llama LLM

### Vector Database

- ChromaDB

### Git Operations

- simple-git

### Version Control

- Git
- GitHub

---

# 📂 Project Structure

```
RepoSense/
│
├── src/
│   ├── routes/
│   │      repoRoutes.js
│   │
│   ├── services/
│   │      githubService.js
│   │      fileService.js
│   │      chunkService.js
│   │      embeddingService.js
│   │      chromaService.js
│   │      llmService.js
│   │
│   ├── app.js
│
├── data/
│      repositories/
│
├── package.json
└── README.md
```

---

# ⚙️ Workflow

## 1. Repository Analysis

- Clone repository
- Read all files
- Filter supported source code files
- Divide code into chunks
- Generate embeddings
- Store vectors in ChromaDB

---

## 2. Search

User enters a query.

Example:

```
How does authentication work?
```

RepoSense

- Generates embedding for the query
- Performs semantic similarity search
- Retrieves Top-K relevant code chunks

---

## 3. RAG Pipeline

Retrieved code chunks are used as context.

Prompt sent to Gemini:

```
Repository Context:

...

Question:

How does authentication work?

Answer:
```

Gemini generates an answer based only on the retrieved repository context.

---

# 🔍 Supported Languages

Current supported extensions:

```
.js
.jsx
.ts
.tsx
.py
.java
.cpp
.c
.json
.md
```

---

# 📡 REST APIs

## Analyze Repository

```
POST /api/analyze-repo
```

Body

```json
{
    "repoUrl":"https://github.com/expressjs/express"
}
```

---

## Search Repository

```
POST /api/search
```

Body

```json
{
    "query":"authentication login"
}
```

---

## Ask Repository

```
POST /api/ask-repo
```

Body

```json
{
    "question":"How does authentication work?"
}
```

---

# 🧠 RAG Pipeline

RepoSense follows a Retrieval-Augmented Generation architecture.

```
Repository
     │
     ▼
Chunking
     │
     ▼
Embeddings
     │
     ▼
ChromaDB
     │
     ▼
Similarity Search
     │
     ▼
Top-K Chunks
     │
     ▼
Gemini
     │
     ▼
Answer
```

---

# 📊 Why ChromaDB?

Instead of searching every code file, ChromaDB stores semantic embeddings and performs efficient Approximate Nearest Neighbor (ANN) search using HNSW indexing.

Benefits:

- Fast semantic search
- Scalable retrieval
- Better RAG performance
- Efficient vector indexing

---

# 📌 Current Capabilities

✅ Clone GitHub repositories

✅ Extract source code

✅ Intelligent code chunking

✅ Generate semantic embeddings

✅ Store vectors in ChromaDB

✅ Semantic similarity search

✅ AI-powered repository Q&A

---

# 🚀 Future Improvements

- Frontend dashboard using React
- Repository visualization
- Multi-repository support
- Repository history
- Conversation memory
- Streaming AI responses
- Support for private GitHub repositories
- Hybrid Search (BM25 + Vector Search)
- Semantic chunking
- Multi-language code parser
- Docker deployment

---

# 📈 Challenges Solved

### Efficient Repository Search

Instead of sending the entire repository to an LLM, the project retrieves only the most relevant code chunks, reducing token usage and improving response quality.

### Scalable Semantic Retrieval

Implemented vector embeddings with ChromaDB to enable efficient semantic search across large repositories.

### Modular RAG Pipeline

Designed the application with separate modules for repository cloning, file extraction, chunking, embedding generation, vector storage, retrieval, and answer generation, making the system maintainable and extensible.

---

# 💡 Key Learnings

- Retrieval-Augmented Generation (RAG)
- Vector Embeddings
- Semantic Search
- ChromaDB
- Git Repository Analysis
- Prompt Engineering
- REST API Design
- AI Application Development

---



# 👩‍💻 Author

**Angel Pauly**

Final Year B.Tech Computer Science Engineering

College of Engineering Trivandrum

---

## ⭐ If you found this project interesting, consider giving it a star!
