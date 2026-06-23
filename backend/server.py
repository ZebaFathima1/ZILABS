from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

SECRET_KEY = os.environ.get('JWT_SECRET', 'zelvora-industry-labs-secret-2026')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24 * 7  # 7 days

app = FastAPI(title="Zelvora Industry Labs API")
api_router = APIRouter(prefix="/api")
bearer_scheme = HTTPBearer(auto_error=False)

# ─────────────────────── Models ───────────────────────

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = 'student'

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    name: str
    email: str
    role: str
    avatar: Optional[str] = None
    track: Optional[str] = None

class TokenOut(BaseModel):
    token: str
    user: UserOut

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class SubmissionStatusUpdate(BaseModel):
    status: str

# ─────────────────────── JWT Helpers ───────────────────────

def create_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(creds: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    if not creds:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(creds.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await db.users.find_one({"id": user_id}, {"_id": 0, "password": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def require_admin(user=Depends(get_current_user)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

# ─────────────────────── DB Seeding ───────────────────────

SEED_TRACKS = [
    {"id": "aiml", "name": "AI & ML", "color": "#00E5FF", "icon": "BrainCircuit", "desc": "Build production ML systems with real datasets."},
    {"id": "fullstack", "name": "Full Stack", "color": "#7C3AED", "icon": "Layers", "desc": "Ship apps end-to-end with modern stacks."},
    {"id": "data", "name": "Data Science", "color": "#00FFA3", "icon": "BarChart3", "desc": "Turn data into decisions and dashboards."},
    {"id": "cyber", "name": "Cyber Security", "color": "#F472B6", "icon": "ShieldCheck", "desc": "Defensive and offensive security projects."},
    {"id": "cloud", "name": "Cloud Computing", "color": "#FBBF24", "icon": "Cloud", "desc": "Deploy and scale on AWS, GCP, Azure."},
    {"id": "genai", "name": "Generative AI", "color": "#A78BFA", "icon": "Sparkles", "desc": "Build with LLMs, RAG, agents and tools."},
]

SEED_PROJECTS = [
    {"id": "p1", "title": "Real-Time Fraud Detection", "track": "aiml", "difficulty": "Advanced", "duration": "6 weeks", "skills": ["Python", "XGBoost", "Kafka", "Streamlit"], "outcomes": ["Build ML pipeline", "Deploy to cloud", "Live dashboard"], "image": "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p2", "title": "SaaS Billing Platform", "track": "fullstack", "difficulty": "Intermediate", "duration": "5 weeks", "skills": ["React", "Node", "Stripe", "Postgres"], "outcomes": ["Auth + RBAC", "Subscriptions", "Webhooks"], "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p3", "title": "Retail Sales Analytics", "track": "data", "difficulty": "Beginner", "duration": "4 weeks", "skills": ["Pandas", "SQL", "PowerBI"], "outcomes": ["ETL pipeline", "KPI dashboard", "Story telling"], "image": "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p4", "title": "Zero Trust Network Audit", "track": "cyber", "difficulty": "Advanced", "duration": "7 weeks", "skills": ["Kali", "Burp", "OWASP", "Wireshark"], "outcomes": ["Threat model", "Pen test report", "Hardening plan"], "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p5", "title": "Multi-Region K8s Deployment", "track": "cloud", "difficulty": "Advanced", "duration": "6 weeks", "skills": ["AWS", "Kubernetes", "Terraform", "GitOps"], "outcomes": ["IaC", "Auto-scaling", "Observability"], "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p6", "title": "RAG Research Assistant", "track": "genai", "difficulty": "Intermediate", "duration": "5 weeks", "skills": ["LangChain", "Pinecone", "OpenAI", "FastAPI"], "outcomes": ["Vector store", "Agent tools", "Eval harness"], "image": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p7", "title": "Computer Vision Quality Inspector", "track": "aiml", "difficulty": "Intermediate", "duration": "5 weeks", "skills": ["PyTorch", "YOLO", "Edge"], "outcomes": ["Dataset curation", "Model training", "Edge deploy"], "image": "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p8", "title": "Real-Time Chat with Presence", "track": "fullstack", "difficulty": "Beginner", "duration": "3 weeks", "skills": ["React", "Socket.io", "Redis"], "outcomes": ["WebSockets", "Scaling", "Auth"], "image": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p9", "title": "Generative Art Studio", "track": "genai", "difficulty": "Beginner", "duration": "3 weeks", "skills": ["Diffusers", "Next.js", "S3"], "outcomes": ["Prompt engineering", "UI/UX", "Gallery"], "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
]

SEED_BADGES = [
    {"id": "b1", "name": "Project Explorer", "tier": "bronze", "color": "#CD7F32", "desc": "Completed your first guided project.", "criteria": "Submit 1 project"},
    {"id": "b2", "name": "Active Contributor", "tier": "silver", "color": "#C0C0C0", "desc": "Consistently shipping work and reviews.", "criteria": "Submit 3 projects + 2 peer reviews"},
    {"id": "b3", "name": "Project Builder", "tier": "gold", "color": "#FFD700", "desc": "Built and shipped multiple real-world projects.", "criteria": "Submit 5 projects"},
    {"id": "b4", "name": "Industry Ready", "tier": "platinum", "color": "#00E5FF", "desc": "Demonstrated production-grade skills.", "criteria": "Complete a track + capstone"},
    {"id": "b5", "name": "Excellence Award", "tier": "diamond", "color": "#7C3AED", "desc": "Top 1% on track with mentor endorsement.", "criteria": "Top leaderboard + mentor review"},
]

SEED_LEADERS = [
    {"rank": 1, "name": "Aarav Mehta", "track": "AI & ML", "xp": 9820, "projects": 12, "country": "IN", "avatar": "https://i.pravatar.cc/120?img=15"},
    {"rank": 2, "name": "Sofia Romero", "track": "Full Stack", "xp": 9410, "projects": 11, "country": "ES", "avatar": "https://i.pravatar.cc/120?img=47"},
    {"rank": 3, "name": "Kenji Watanabe", "track": "Generative AI", "xp": 9180, "projects": 10, "country": "JP", "avatar": "https://i.pravatar.cc/120?img=33"},
    {"rank": 4, "name": "Priya Sharma", "track": "Data Science", "xp": 8900, "projects": 10, "country": "IN", "avatar": "https://i.pravatar.cc/120?img=49"},
    {"rank": 5, "name": "Liam O'Connor", "track": "Cloud", "xp": 8720, "projects": 9, "country": "IE", "avatar": "https://i.pravatar.cc/120?img=12"},
    {"rank": 6, "name": "Nora Hassan", "track": "Cyber Security", "xp": 8540, "projects": 9, "country": "EG", "avatar": "https://i.pravatar.cc/120?img=45"},
    {"rank": 7, "name": "Diego Alvarez", "track": "Full Stack", "xp": 8420, "projects": 9, "country": "MX", "avatar": "https://i.pravatar.cc/120?img=68"},
    {"rank": 8, "name": "Mei Lin", "track": "AI & ML", "xp": 8210, "projects": 8, "country": "SG", "avatar": "https://i.pravatar.cc/120?img=20"},
    {"rank": 9, "name": "Ahmed Khalil", "track": "Cloud", "xp": 7990, "projects": 8, "country": "AE", "avatar": "https://i.pravatar.cc/120?img=53"},
    {"rank": 10, "name": "Hannah Becker", "track": "Data Science", "xp": 7820, "projects": 7, "country": "DE", "avatar": "https://i.pravatar.cc/120?img=44"},
]

SEED_SUBMISSIONS = [
    {"id": "sub_1001", "student": "Aarav Mehta", "project": "Real-Time Fraud Detection", "track": "AI & ML", "submitted": "2026-07-04", "status": "Pending"},
    {"id": "sub_1002", "student": "Sofia Romero", "project": "SaaS Billing Platform", "track": "Full Stack", "submitted": "2026-07-04", "status": "In Review"},
    {"id": "sub_1003", "student": "Kenji Watanabe", "project": "RAG Research Assistant", "track": "GenAI", "submitted": "2026-07-03", "status": "Approved"},
    {"id": "sub_1004", "student": "Priya Sharma", "project": "Retail Sales Analytics", "track": "Data Science", "submitted": "2026-07-03", "status": "Pending"},
    {"id": "sub_1005", "student": "Nora Hassan", "project": "Zero Trust Audit", "track": "Cyber Security", "submitted": "2026-07-02", "status": "Pending"},
]


async def seed_collection(collection, data, key="id"):
    if await db[collection].count_documents({}) == 0:
        await db[collection].insert_many([{**item} for item in data])
        logger.info(f"Seeded {collection} with {len(data)} records")


async def seed_demo_users():
    demo_password_hash = bcrypt.hashpw(b"zelvora123", bcrypt.gensalt()).decode()
    admin_password_hash = bcrypt.hashpw(b"admin123", bcrypt.gensalt()).decode()

    demo_student = {
        "id": "stu_28471",
        "name": "Aarav Mehta",
        "email": "aarav@zelvoratech.com",
        "password": demo_password_hash,
        "role": "student",
        "avatar": "https://i.pravatar.cc/120?img=15",
        "track": "AI & ML",
        "level": 7,
        "xp": 9820,
        "xpNext": 12000,
        "streakDays": 23,
        "attendance": 96,
        "joinDate": "2025-04-12",
        "badges": ["b1", "b2", "b3", "b4"],
        "assignedProjects": [
            {"id": "p1", "status": "In Review", "progress": 92, "due": "2026-07-12"},
            {"id": "p7", "status": "In Progress", "progress": 64, "due": "2026-07-20"},
            {"id": "p6", "status": "Submitted", "progress": 100, "due": "2026-06-28"},
        ],
        "achievements": [
            {"id": "a1", "title": "First Place — June Hackathon", "date": "2026-06-22"},
            {"id": "a2", "title": "Mentor Endorsement — Vision", "date": "2026-06-10"},
            {"id": "a3", "title": "Top 1% — AI/ML Track", "date": "2026-05-30"},
        ],
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }
    demo_admin = {
        "id": "adm_001",
        "name": "Admin Console",
        "email": "admin@zelvoratech.com",
        "password": admin_password_hash,
        "role": "admin",
        "avatar": "https://i.pravatar.cc/120?img=8",
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }

    for user in [demo_student, demo_admin]:
        existing = await db.users.find_one({"email": user["email"]})
        if not existing:
            await db.users.insert_one(user)
            logger.info(f"Created demo user: {user['email']}")


# ─────────────────────── Existing Routes ───────────────────────

@api_router.get("/")
async def root():
    return {"message": "Zelvora Industry Labs API v2"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# ─────────────────────── Auth ───────────────────────

@api_router.post("/auth/register", response_model=TokenOut)
async def register(body: UserRegister):
    existing = await db.users.find_one({"email": body.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = bcrypt.hashpw(body.password.encode(), bcrypt.gensalt()).decode()
    user_id = str(uuid.uuid4())
    avatar_idx = abs(hash(body.email)) % 70 + 1

    user_doc = {
        "id": user_id,
        "name": body.name,
        "email": body.email,
        "password": hashed,
        "role": body.role,
        "avatar": f"https://i.pravatar.cc/120?img={avatar_idx}",
        "track": "AI & ML",
        "level": 1,
        "xp": 0,
        "xpNext": 2000,
        "streakDays": 0,
        "attendance": 100,
        "joinDate": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        "badges": [],
        "assignedProjects": [],
        "achievements": [],
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }
    await db.users.insert_one(user_doc)

    token = create_token(user_id)
    user_out = UserOut(
        id=user_id,
        name=user_doc["name"],
        email=user_doc["email"],
        role=user_doc["role"],
        avatar=user_doc["avatar"],
        track=user_doc["track"],
    )
    return TokenOut(token=token, user=user_out)


@api_router.post("/auth/login", response_model=TokenOut)
async def login(body: UserLogin):
    user = await db.users.find_one({"email": body.email}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not bcrypt.checkpw(body.password.encode(), user["password"].encode()):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token(user["id"])
    user_out = UserOut(
        id=user["id"],
        name=user["name"],
        email=user["email"],
        role=user["role"],
        avatar=user.get("avatar"),
        track=user.get("track"),
    )
    return TokenOut(token=token, user=user_out)


@api_router.get("/auth/me", response_model=UserOut)
async def get_me(user=Depends(get_current_user)):
    return UserOut(**user)

# ─────────────────────── Projects & Tracks ───────────────────────

@api_router.get("/projects")
async def get_projects():
    projects = await db.projects.find({}, {"_id": 0}).to_list(100)
    return projects

@api_router.get("/tracks")
async def get_tracks():
    tracks = await db.tracks.find({}, {"_id": 0}).to_list(20)
    return tracks

@api_router.get("/badges")
async def get_badges():
    badges = await db.badges.find({}, {"_id": 0}).to_list(20)
    return badges

# ─────────────────────── Leaderboard ───────────────────────

@api_router.get("/leaderboard")
async def get_leaderboard():
    leaders = await db.leaderboard.find({}, {"_id": 0}).sort("xp", -1).to_list(50)
    return leaders

# ─────────────────────── Student ───────────────────────

@api_router.get("/student/me")
async def get_student_me(user=Depends(get_current_user)):
    student = await db.users.find_one({"id": user["id"]}, {"_id": 0, "password": 0})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

# ─────────────────────── Contact ───────────────────────

@api_router.post("/contact")
async def submit_contact(body: ContactMessage):
    doc = body.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["createdAt"] = datetime.now(timezone.utc).isoformat()
    await db.contact_messages.insert_one(doc)
    return {"success": True, "message": "Message received. We'll be in touch soon."}

# ─────────────────────── Admin ───────────────────────

@api_router.get("/admin/stats")
async def get_admin_stats(user=Depends(require_admin)):
    total_students = await db.users.count_documents({"role": "student"})
    total_credentials = await db.credentials.count_documents({})
    pending_reviews = await db.submissions.count_documents({"status": {"$in": ["Pending", "In Review"]}})
    live_programs = await db.tracks.count_documents({})
    return [
        {"label": "Pending Reviews", "value": pending_reviews, "delta": "+8%"},
        {"label": "Active Students", "value": total_students, "delta": "+12%"},
        {"label": "Issued Credentials", "value": total_credentials, "delta": "+19%"},
        {"label": "Live Programs", "value": live_programs, "delta": "+2"},
    ]

@api_router.get("/admin/submissions")
async def get_admin_submissions(user=Depends(require_admin)):
    subs = await db.submissions.find({}, {"_id": 0}).sort("submitted", -1).to_list(100)
    return subs

@api_router.patch("/admin/submissions/{sub_id}")
async def update_submission_status(sub_id: str, body: SubmissionStatusUpdate, user=Depends(require_admin)):
    result = await db.submissions.update_one({"id": sub_id}, {"$set": {"status": body.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Submission not found")
    return {"success": True}

# ─────────────────────── App setup ───────────────────────

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_db_client():
    await seed_collection("tracks", SEED_TRACKS)
    await seed_collection("projects", SEED_PROJECTS)
    await seed_collection("badges", SEED_BADGES)
    await seed_collection("leaderboard", SEED_LEADERS)
    await seed_collection("submissions", SEED_SUBMISSIONS)
    await seed_demo_users()
    logger.info("Database seeding complete")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
