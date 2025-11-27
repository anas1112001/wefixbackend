# PowerShell script to start backend as a background process
# This keeps the backend running even after closing the terminal

$backendPath = "D:\Projects\WeFix\Jehad\Cursor\Backend"
$logFile = "$backendPath\backend.log"

Write-Host "Starting WeFix Backend Server..." -ForegroundColor Cyan

# Check if backend is already running
$existingProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*Backend*" }
if ($existingProcess) {
    Write-Host "Backend is already running (PID: $($existingProcess.Id))" -ForegroundColor Yellow
    $restart = Read-Host "Do you want to restart it? (y/n)"
    if ($restart -eq "y") {
        Stop-Process -Id $existingProcess.Id -Force
        Start-Sleep -Seconds 2
    } else {
        exit 0
    }
}

# Navigate to backend directory
Push-Location $backendPath

# Check if dist folder exists
if (-not (Test-Path "dist\server.js")) {
    Write-Host "Building backend..." -ForegroundColor Yellow
    npm run start 2>&1 | Out-Null
}

# Set environment variables
$env:NODE_ENV = "production"
$env:PORT = "4000"
$env:CORS_ORIGINS = "http://localhost,http://localhost:80,http://localhost:3000"

# Start backend in background
Write-Host "Starting backend on port 4000..." -ForegroundColor Green
Start-Process -FilePath "node" -ArgumentList "dist/server.js" -WorkingDirectory $backendPath -WindowStyle Hidden -RedirectStandardOutput $logFile -RedirectStandardError $logFile

Pop-Location

Write-Host ""
Write-Host "Backend started!" -ForegroundColor Green
Write-Host "  Log file: $logFile" -ForegroundColor Cyan
Write-Host "  GraphQL: http://localhost:4000/graphql" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop the backend, run: stop-backend-service.ps1" -ForegroundColor Yellow
Write-Host ""

