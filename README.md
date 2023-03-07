# Gift Web Scraping
Web Scraping of a web of gift recommendation

## Instructions

Run Dev Container

Start Flask

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