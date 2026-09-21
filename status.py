from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["status"])

@router.get("/status")
async def get_status():
    # In a real deployment this would query monitoring services.
    return {
        "gpu_ready": True,
        "message": "GPU Cluster is healthy",
        "timestamp": None,
    }
