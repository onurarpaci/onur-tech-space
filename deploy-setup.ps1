# Portfolio Deployment Automation Script
# Run this script after restarting your terminal

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Portfolio Deployment Setup" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is available
Write-Host "[1/6] Checking Git installation..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "Success: Git is installed: $gitVersion" -ForegroundColor Green
}
catch {
    Write-Host "Error: Git not found. Please restart your terminal and run this script again." -ForegroundColor Red
    exit 1
}

# Configure Git
Write-Host ""
Write-Host "[2/6] Configuring Git..." -ForegroundColor Yellow
$userName = Read-Host "Enter your name (for Git commits)"
$userEmail = Read-Host "Enter your email (same as GitHub account)"

git config --global user.name "$userName"
git config --global user.email "$userEmail"
Write-Host "Success: Git configured" -ForegroundColor Green

# Initialize repository
Write-Host ""
Write-Host "[3/6] Initializing Git repository..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "Success: Repository already initialized" -ForegroundColor Green
}
else {
    git init
    Write-Host "Success: Repository initialized" -ForegroundColor Green
}

# Add all files
Write-Host ""
Write-Host "[4/6] Staging files..." -ForegroundColor Yellow
git add .
Write-Host "Success: All files staged" -ForegroundColor Green

# Commit
Write-Host ""
Write-Host "[5/6] Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Portfolio website with animations and contact form"
Write-Host "Success: Initial commit created" -ForegroundColor Green

# GitHub setup
Write-Host ""
Write-Host "[6/6] GitHub repository setup..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
Write-Host "2. Create a repository named 'portfolio' (or any name)" -ForegroundColor White
Write-Host "3. Keep it PUBLIC" -ForegroundColor White
Write-Host "4. Do NOT initialize with README" -ForegroundColor White
Write-Host "5. Copy the repository URL (e.g., https://github.com/USERNAME/portfolio.git)" -ForegroundColor White
Write-Host ""

$repoUrl = Read-Host "Paste your GitHub repository URL here"

if ($repoUrl) {
    git remote add origin $repoUrl
    Write-Host "Success: Remote repository added" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    Write-Host "You may be prompted for credentials:" -ForegroundColor Cyan
    Write-Host "- Username: Your GitHub username" -ForegroundColor White
    Write-Host "- Password: Use a Personal Access Token (NOT your password)" -ForegroundColor White
    Write-Host "  Create token at: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host ""
    
    git branch -M main
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "==================================================" -ForegroundColor Green
        Write-Host "  SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
        Write-Host "==================================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next: Deploy to Vercel" -ForegroundColor Cyan
        Write-Host "1. Go to: https://vercel.com/signup" -ForegroundColor White
        Write-Host "2. Sign in with GitHub" -ForegroundColor White
        Write-Host "3. Import your 'portfolio' repository" -ForegroundColor White
        Write-Host "4. Click Deploy" -ForegroundColor White
        Write-Host "5. Your site will be live in ~2 minutes!" -ForegroundColor White
        Write-Host ""
        Write-Host "Your portfolio will be at: https://portfolio-XXXXX.vercel.app" -ForegroundColor Yellow
    }
    else {
        Write-Host "Error: Push failed. Check your credentials and try again." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Script completed!" -ForegroundColor Cyan
