from sqlalchemy.orm import Session
from . import models, schemas

def get_events(db: Session):
    return db.query(models.Event).all()

def create_event(db: Session, event: schemas.EventCreate):
    new_event = models.Event(name=event.name, description=event.description)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

