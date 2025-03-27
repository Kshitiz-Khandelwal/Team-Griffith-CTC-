from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.database import Base, engine, get_db
from app import crud, schemas

app = FastAPI()

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "FastAPI is running!"}

@app.get("/events", response_model=list[schemas.EventResponse])
def read_events(db: Session = Depends(get_db)):
    """
    Retrieve all events from the database.
    """
    return crud.get_events(db)

@app.post("/events", response_model=schemas.EventResponse)
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    """
    Create a new event in the database.
    """
    return crud.create_event(db, event)