@echo off
echo ===================================================
echo     Iniciando 3DMarket (Backend + Frontend)
echo ===================================================

echo [1/2] Iniciando Backend Spring Boot (Puerto 8080)...
start "3DMarket Backend (Spring Boot)" cmd /k "cd /d %~dp0backend && mvnw.cmd spring-boot:run"

timeout /t 3 /nobreak > nul

echo [2/2] Iniciando Frontend React + Vite (Puerto 5173)...
start "3DMarket Frontend (Vite)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Todo listo. Tus ventanas de terminal estan abiertas.
echo Accede a http://localhost:5173 en tu navegador.
echo ===================================================
pause
