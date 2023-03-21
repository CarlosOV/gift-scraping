# Gift Web Scraping
Web Scraping of a gift recommendation website

## Instructions

### Run Dev Container

```
python3 app.py
```

## Deploy

### Create venv

```
python3 -m venv venv
```

### Active venv

```
source venv/bin/activate
```

### Install dependencies

```
pip3 install -r requirements.txt
```

### Install gunicorn

```
pip3 install gunicorn
```

### Start server with gunicorn

```
gunicorn -w 4 -b 0.0.0.0:8000 gift_recommender.api.main:app
```


## Folder Structure

```
gift_recommender/
├── __init__.py
├── application/
│   ├── __init__.py
│   ├── product_catalog_use_cases.py
│   ├── category_use_cases.py
│   └── ports/
│       ├── __init__.py
│       ├── category_port.py
│       └── product_catalog_port.py
├── domain/
│   ├── __init__.py
│   ├── category.py
│   └── product.py
├─── infrastructure/
│   ├── __init__.py
│   └── adapters/
│       ├── __init__.py
│       ├── category_adapter.py
│       └── product_catalog_adapter.py
└── api/
    ├── __init__.py
    ├── product_catalog_api.py
    └── prompt_api.py
```