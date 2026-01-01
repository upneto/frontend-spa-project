@echo off
cd resources\nginx\nginx-1.25.3
nginx.exe -s stop
echo Nginx stopped.
pause