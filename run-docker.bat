@echo off
echo ===================================================
echo     Construyendo y Levantando 3DMarket con Docker
echo ===================================================
echo.
echo 1. Verificando Docker Desktop...
docker info > nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Docker no esta corriendo. Por favor abre Docker Desktop primero.
    pause
    exit /b 1
)

echo 2. Construyendo imagenes y levantando contenedores (MariaDB, Backend, Frontend)...
cd /d "%~dp0"
docker compose up --build -d

echo.
echo ===================================================
echo   ¡Contenedores levantados con exito!
echo ===================================================
echo   Frontend (React + Visor 3D):  http://localhost:5173
echo   Backend (Spring Boot REST):   http://localhost:8081/api/models
echo   Base de Datos (MariaDB 11.4): Puerto 3306
echo.
echo Para ver los logs de los contenedores en vivo:
echo   docker compose logs -f
echo.
echo Para detener los contenedores:
echo   docker compose down
echo ===================================================
pause
