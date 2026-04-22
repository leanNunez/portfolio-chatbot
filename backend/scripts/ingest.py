"""
Script de ingestión — convierte los documentos de data/ en vectores en ChromaDB.

Uso:
    cd backend
    python scripts/ingest.py

Es idempotente: borra la colección existente antes de re-indexar.
Correrlo cada vez que modifiques los archivos de data/.
"""

import os
import sys
from pathlib import Path

import chromadb
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

DOCUMENTS = [
    {"path": "data/cv.md",       "source": "cv",       "section": "experiencia"},
    {"path": "data/projects.md", "source": "projects",  "section": "proyectos"},
    {"path": "data/skills.md",   "source": "skills",    "section": "habilidades"},
    {"path": "data/bio.md",      "source": "bio",       "section": "perfil"},
]

CHROMA_DIR  = os.getenv("CHROMA_PERSIST_DIR", "./chroma_db")
COLLECTION  = "portfolio"
EMBED_MODEL = "models/gemini-embedding-001"
CHUNK_SIZE  = 500
CHUNK_OVERLAP = 50


def load_documents():
    all_chunks = []
    for doc_config in DOCUMENTS:
        path = doc_config["path"]
        if not os.path.exists(path):
            print(f"  [WARN] No encontrado: {path} — omitiendo")
            continue
        text = Path(path).read_text(encoding="utf-8")
        chunks = split_text(text)
        for i, chunk in enumerate(chunks):
            all_chunks.append({
                "text":     chunk,
                "source":   doc_config["source"],
                "section":  doc_config["section"],
                "id":       f"{doc_config['source']}_{i}",
            })
        print(f"  [OK] {path} → {len(chunks)} chunks")
    return all_chunks


def split_text(text: str) -> list[str]:
    """Divide el texto en chunks respetando párrafos."""
    paragraphs = text.split("\n\n")
    chunks = []
    current = ""

    for para in paragraphs:
        if len(current) + len(para) <= CHUNK_SIZE:
            current += para + "\n\n"
        else:
            if current.strip():
                chunks.append(current.strip())
            current = para + "\n\n"

    if current.strip():
        chunks.append(current.strip())

    return chunks


def get_embedding(text: str) -> list[float]:
    result = genai.embed_content(
        model=EMBED_MODEL,
        content=text,
        task_type="retrieval_document",
    )
    return result["embedding"]


def ingest():
    print("\n=== Iniciando ingestión ===\n")

    print("1. Cargando y dividiendo documentos...")
    chunks = load_documents()
    if not chunks:
        print("  [ERROR] No hay documentos. Revisá la carpeta data/")
        sys.exit(1)
    print(f"  [OK] Total: {len(chunks)} chunks")

    print("\n2. Generando embeddings con Google Gemini...")
    embeddings = []
    for i, chunk in enumerate(chunks):
        embedding = get_embedding(chunk["text"])
        embeddings.append(embedding)
        print(f"  [{i+1}/{len(chunks)}] {chunk['source']} — chunk {i}")

    print("\n3. Guardando en ChromaDB...")
    client = chromadb.PersistentClient(path=CHROMA_DIR)

    # Borrar colección existente (idempotente)
    try:
        client.delete_collection(COLLECTION)
        print("  [OK] Colección anterior eliminada")
    except Exception:
        pass

    collection = client.create_collection(COLLECTION)
    collection.add(
        ids=[c["id"] for c in chunks],
        documents=[c["text"] for c in chunks],
        embeddings=embeddings,
        metadatas=[{"source": c["source"], "section": c["section"]} for c in chunks],
    )

    print("\n=== Ingestión completa ===")
    print(f"  Vector store: {CHROMA_DIR}")
    print(f"  Colección: {COLLECTION}")
    print(f"  Chunks indexados: {len(chunks)}\n")


if __name__ == "__main__":
    ingest()
