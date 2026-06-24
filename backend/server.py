from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Zelvora Industry Labs API")
api_router = APIRouter(prefix="/api")

# ─────────────────────── Models ───────────────────────

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactMessageOut(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    status: str
    createdAt: str

class ContactInfoOut(BaseModel):
    email: str
    supportEmail: str
    phone: str
    phoneRaw: str
    address: str
    hours: str
    website: str
    responseNote: str

class ContactMessageStatusUpdate(BaseModel):
    status: str

class SubmissionStatusUpdate(BaseModel):
    status: str

# ─────────────────────── DB Seeding ───────────────────────

SEED_TRACKS = [
    {"id": "webdev", "name": "Web Development", "color": "#00E5FF", "icon": "Globe", "desc": "Build modern responsive websites and web applications."},
    {"id": "python", "name": "Python Development", "color": "#3776AB", "icon": "Terminal", "desc": "Master Python programming for automation, scripting, and backend development."},
    {"id": "java", "name": "Java Development", "color": "#F89820", "icon": "Code2", "desc": "Build scalable enterprise backend systems using Java and Spring Boot."},
    {"id": "fullstack", "name": "Full Stack Development", "color": "#7C3AED", "icon": "Layers", "desc": "Ship full-stack applications end-to-end with modern frameworks."},
    {"id": "data", "name": "Data Analytics", "color": "#00FFA3", "icon": "BarChart3", "desc": "Analyze data, perform statistical tests, and build interactive dashboards."},
    {"id": "ai", "name": "Artificial Intelligence", "color": "#EC4899", "icon": "BrainCircuit", "desc": "Build production machine learning and AI models with real-world datasets."},
    {"id": "uiux", "name": "UI/UX Design", "color": "#F472B6", "icon": "Palette", "desc": "Design premium, highly interactive user experiences and interfaces."},
    {"id": "cyber", "name": "Cyber Security", "color": "#EF4444", "icon": "ShieldCheck", "desc": "Secure modern networks, perform pen testing, and conduct security audits."},
    {"id": "marketing", "name": "Digital Marketing", "color": "#10B981", "icon": "Megaphone", "desc": "Drive growth and brand engagement through modern digital strategies."},
    {"id": "cloud", "name": "Cloud & DevOps", "color": "#FBBF24", "icon": "Cloud", "desc": "Deploy and orchestrate highly available infrastructure and pipelines on cloud."},
]

SEED_PROJECTS = [
    {"id": "p1", "title": "Real-Time Fraud Detection", "track": "ai", "difficulty": "Advanced", "duration": "6 weeks", "skills": ["Python", "XGBoost", "Kafka", "Streamlit"], "outcomes": ["Build ML pipeline", "Deploy to cloud", "Live dashboard"], "image": "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p2", "title": "SaaS Billing Platform", "track": "fullstack", "difficulty": "Intermediate", "duration": "5 weeks", "skills": ["React", "Node", "Stripe", "Postgres"], "outcomes": ["Auth + RBAC", "Subscriptions", "Webhooks"], "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p3", "title": "Retail Sales Analytics", "track": "data", "difficulty": "Beginner", "duration": "4 weeks", "skills": ["Pandas", "SQL", "PowerBI"], "outcomes": ["ETL pipeline", "KPI dashboard", "Story telling"], "image": "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p4", "title": "Zero Trust Network Audit", "track": "cyber", "difficulty": "Advanced", "duration": "7 weeks", "skills": ["Kali", "Burp", "OWASP", "Wireshark"], "outcomes": ["Threat model", "Pen test report", "Hardening plan"], "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p5", "title": "Multi-Region K8s Deployment", "track": "cloud", "difficulty": "Advanced", "duration": "6 weeks", "skills": ["AWS", "Kubernetes", "Terraform", "GitOps"], "outcomes": ["IaC", "Auto-scaling", "Observability"], "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p6", "title": "RAG Research Assistant", "track": "ai", "difficulty": "Intermediate", "duration": "5 weeks", "skills": ["LangChain", "Pinecone", "OpenAI", "FastAPI"], "outcomes": ["Vector store", "Agent tools", "Eval harness"], "image": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p7", "title": "Computer Vision Quality Inspector", "track": "ai", "difficulty": "Intermediate", "duration": "5 weeks", "skills": ["PyTorch", "YOLO", "Edge"], "outcomes": ["Dataset curation", "Model training", "Edge deploy"], "image": "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p8", "title": "Real-Time Chat with Presence", "track": "webdev", "difficulty": "Beginner", "duration": "3 weeks", "skills": ["React", "Socket.io", "Redis"], "outcomes": ["WebSockets", "Scaling", "Auth"], "image": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p9", "title": "Automated Web Scraping Engine", "track": "python", "difficulty": "Intermediate", "duration": "4 weeks", "skills": ["Python", "BeautifulSoup", "Scrapy", "PostgreSQL"], "outcomes": ["Distributed scraping", "Data cleaning", "API output"], "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p10", "title": "Enterprise Microservices Infrastructure", "track": "java", "difficulty": "Advanced", "duration": "6 weeks", "skills": ["Java", "Spring Boot", "Docker", "Eureka"], "outcomes": ["Service registry", "API Gateway", "Distributed tracing"], "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p11", "title": "Neomorphic E-Commerce Experience", "track": "uiux", "difficulty": "Beginner", "duration": "3 weeks", "skills": ["Figma", "Design Systems", "Prototyping", "User Research"], "outcomes": ["High-fidelity design", "Interactive prototype", "Usability test report"], "image": "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
    {"id": "p12", "title": "SEO & Growth Campaign Optimizer", "track": "marketing", "difficulty": "Intermediate", "duration": "4 weeks", "skills": ["Google Analytics", "SEO", "A/B Testing", "Copywriting"], "outcomes": ["Growth audit", "Keywords strategy", "A/B test dashboard"], "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"},
]

SEED_BADGES = [
    {"id": "b1", "name": "Project Explorer", "tier": "bronze", "color": "#CD7F32", "desc": "Completed your first guided project.", "criteria": "Submit 1 project", "image": "/explorer-badge.png"},
    {"id": "b3", "name": "Project Builder", "tier": "gold", "color": "#FFD700", "desc": "Built and shipped multiple real-world projects.", "criteria": "Submit 5 projects", "image": "/builder-badge.png"},
    {"id": "b4", "name": "Industry Practitioner", "tier": "platinum", "color": "#00E5FF", "desc": "Demonstrated production-grade skills.", "criteria": "Complete a track + capstone", "image": "/practitioner-badge.png"},
    {"id": "b5", "name": "Excellence Award", "tier": "diamond", "color": "#7C3AED", "desc": "Top 1% on track with mentor endorsement.", "criteria": "Top leaderboard + mentor review", "image": "/excellence-badge.png"},
]

SEED_LEADERS = []

SEED_SUBMISSIONS = [
    {"id": "sub_1001", "student": "Aarav Mehta", "project": "Real-Time Fraud Detection", "track": "Artificial Intelligence", "submitted": "2026-07-04", "status": "Pending"},
    {"id": "sub_1002", "student": "Sofia Romero", "project": "SaaS Billing Platform", "track": "Full Stack Development", "submitted": "2026-07-04", "status": "In Review"},
    {"id": "sub_1003", "student": "Kenji Watanabe", "project": "RAG Research Assistant", "track": "Artificial Intelligence", "submitted": "2026-07-03", "status": "Approved"},
    {"id": "sub_1004", "student": "Priya Sharma", "project": "Retail Sales Analytics", "track": "Data Analytics", "submitted": "2026-07-03", "status": "Pending"},
    {"id": "sub_1005", "student": "Nora Hassan", "project": "Zero Trust Network Audit", "track": "Cyber Security", "submitted": "2026-07-02", "status": "Pending"},
]

SEED_CONTACT_INFO = {
    "id": "main",
    "email": "info@zelvoratech.com",
    "supportEmail": "info@zelvoratech.com",
    "phone": "+91 9100040993",
    "phoneRaw": "9100040993",
    "address": "Hyderabad, Telangana, India",
    "hours": "Mon – Sat, 9:00 AM – 6:00 PM IST",
    "website": "https://zelvoratech.com",
    "responseNote": "We typically respond within 24 hours on business days.",
}


async def seed_collection(collection, data, key="id"):
    if await db[collection].count_documents({}) == 0:
        await db[collection].insert_many([{**item} for item in data])
        logger.info(f"Seeded {collection} with {len(data)} records")


async def seed_contact_info():
    existing = await db.contact_info.find_one({"id": "main"})
    if not existing:
        await db.contact_info.insert_one({**SEED_CONTACT_INFO})
        logger.info("Seeded contact_info")





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



# ─────────────────────── Projects & Tracks ───────────────────────

@api_router.get("/projects")
async def get_projects():
    projects = await db.projects.find({}, {"_id": 0}).to_list(100)
    if not projects:
        return SEED_PROJECTS
    return projects

@api_router.get("/tracks")
async def get_tracks():
    tracks = await db.tracks.find({}, {"_id": 0}).to_list(20)
    if not tracks:
        return SEED_TRACKS
    return tracks

@api_router.get("/badges")
async def get_badges():
    badges = await db.badges.find({}, {"_id": 0}).to_list(20)
    if not badges:
        return SEED_BADGES
    return badges

# ─────────────────────── Leaderboard ───────────────────────

@api_router.get("/leaderboard")
async def get_leaderboard():
    leaders = await db.leaderboard.find({}, {"_id": 0}).sort("xp", -1).to_list(50)
    return leaders



# ─────────────────────── Contact ───────────────────────

@api_router.get("/contact/info", response_model=ContactInfoOut)
async def get_contact_info():
    info = await db.contact_info.find_one({"id": "main"}, {"_id": 0, "id": 0})
    if not info:
        return ContactInfoOut(**SEED_CONTACT_INFO)
    return ContactInfoOut(**info)


@api_router.post("/contact", response_model=ContactMessageOut)
async def submit_contact(body: ContactMessage):
    doc = {
        **body.model_dump(),
        "id": str(uuid.uuid4()),
        "status": "New",
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }
    await db.contact_messages.insert_one(doc)
    return ContactMessageOut(**doc)




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
    # Drop collections to force re-seeding of updated tracks & projects
    await db.tracks.drop()
    await db.projects.drop()
    await db.submissions.drop()
    await db.badges.drop()

    await seed_collection("tracks", SEED_TRACKS)
    await seed_collection("projects", SEED_PROJECTS)
    await seed_collection("badges", SEED_BADGES)
    await seed_collection("leaderboard", SEED_LEADERS)
    await seed_collection("submissions", SEED_SUBMISSIONS)
    await seed_contact_info()
    logger.info("Database seeding complete")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
