# PowerShell script to stop the backend service

Write-Host "Stopping WeFix Backend Server..." -ForegroundColor Cyan

$backendPath = "D:\Projects\WeFix\Jehad\Cursor\Backend"
$processes = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { 
    $_.Path -like "*Backend*" -or 
    (Get-Content $_.Path -ErrorAction SilentlyContinue | Select-String -Pattern "dist/server.js" -Quiet)
}

if ($processes) {
    foreach ($proc in $processes) {
        Write-Host "Stopping process (PID: $($proc.Id))..." -ForegroundColor Yellow
        Stop-Process -Id $proc.Id -Force
    }
    Write-Host "Backend stopped successfully!" -ForegroundColor Green
} else {
    Write-Host "No backend process found running." -ForegroundColor Yellow
}

