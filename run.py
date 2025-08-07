import os
import sys
import uvicorn

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

if __name__ == "__main__":
    # Run from root directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)