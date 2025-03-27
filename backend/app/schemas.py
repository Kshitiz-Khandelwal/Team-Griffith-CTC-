from pydantic import BaseModel

class EventBase(BaseModel):
    name: str
    description: str

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int

    class Config:
        orm_mode = True

