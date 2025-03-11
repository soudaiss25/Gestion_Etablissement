FROM python:3.11

WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

COPY backend /app
EXPOSE 8000

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
