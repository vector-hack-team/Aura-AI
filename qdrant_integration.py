from qdrant_client import QdrantClient
from qdrant_client.http.models import PointStruct

# Connect to your Qdrant Cloud instance
client = QdrantClient(
    url="https://4c059d24-42f2-4b76-b9d0-b733dcd4700d.us-east4-0.gcp.cloud.qdrant.io",
    api_key="YOUR_API_KEY"
)

# Example: create a collection
def create_collection():
    client.recreate_collection(
        collection_name="hackathon_collection",
        vector_size=128,  # adjust based on your embeddings
        distance="Cosine"
    )
    print("Collection created!")

# Example: insert sample data
def insert_vectors():
    vectors = [
        PointStruct(id=1, vector=[0.1]*128, payload={"name": "Item 1"}),
        PointStruct(id=2, vector=[0.2]*128, payload={"name": "Item 2"})
    ]
    client.upsert(collection_name="hackathon_collection", points=vectors)
    print("Vectors inserted!")

# Example: search
def search_vector(query_vector):
    results = client.search(
        collection_name="hackathon_collection",
        query_vector=query_vector,
        limit=3
    )
    return results
