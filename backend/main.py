from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List
from jose import jwt
from datetime import datetime, timedelta
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
SECRET_KEY = os.getenv("SECRET_KEY", "secretlasavo")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)

class Credit(Base):
    __tablename__ = "credits"
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String)
    state = Column(String)
    quantity = Column(Integer)
    price = Column(Integer)
    status = Column(String, default="open")

Base.metadata.create_all(bind=engine)

class CreditCreate(BaseModel):
    category: str
    state: str
    quantity: int
    price: int

class CreditOut(BaseModel):
    id: int
    category: str
    state: str
    quantity: int
    price: int
    status: str
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or user.password != form_data.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = jwt.encode({"sub": user.email, "exp": datetime.utcnow() + timedelta(minutes=60)}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}

@app.get("/credits/list", response_model=List[CreditOut])
def list_credits(db: Session = Depends(get_db)):
    return db.query(Credit).all()

@app.post("/credits/create", response_model=CreditOut)
def create_credit(credit: CreditCreate, db: Session = Depends(get_db)):
    db_credit = Credit(**credit.dict())
    db.add(db_credit)
    db.commit()
    db.refresh(db_credit)
    return db_credit
