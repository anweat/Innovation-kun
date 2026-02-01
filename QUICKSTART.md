# Quick Start Guide

## Starting the Application

### Windows (Recommended)
Simply double-click `run.bat` in the root directory, or run:
```cmd
run.bat
```

### Command Line (All Platforms)

**Option 1: Start both services together (Recommended)**
```bash
npm run dev:both
```

**Option 2: Start services separately**

Terminal 1 - Start Backend:
```bash
npm run dev:api
```

Terminal 2 - Start Frontend:
```bash
npm run dev:web
```

## Verification

1. Backend API: http://localhost:3001/health
   - Should return `{"status":"ok","database":"connected",...}`

2. Frontend: http://localhost:3000
   - If you see a red banner "Backend API is not responding", the backend is not running

## Troubleshooting

### ECONNREFUSED 127.0.0.1:3001

**Problem**: Backend is not running

**Solution**:
1. Start the backend first: `npm run dev:api`
2. Wait for "API server running on http://localhost:3001"
3. Then start frontend: `npm run dev:web`

Or use `npm run dev:both` to start both automatically.

### Database Errors

**Problem**: `Database connection failed`

**Solution**:
```bash
cd apps/api
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

### Port Already in Use

**Check what's using port 3001 (Windows)**:
```cmd
netstat -ano | findstr :3001
```

**Kill the process** (replace PID with the number from above):
```cmd
taskkill /PID <PID> /F
```

## Service URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## Development Workflow

1. Make code changes
2. Frontend auto-reloads (Vite HMR)
3. Backend auto-reloads (tsx watch)
4. No manual restart needed!
