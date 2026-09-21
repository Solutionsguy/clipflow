import json
import logging
from fastapi import APIRouter, Request

router = APIRouter(prefix="/api/telemetry", tags=["telemetry"])

logging.basicConfig(level=logging.INFO, filename='logs/telemetry.log', filemode='a',
                    format='%(asctime)s - %(message)s')

@router.post("")
async def receive_telemetry(request: Request):
    payload = await request.json()
    logging.info(json.dumps(payload))
    return {"status": "ok"}
