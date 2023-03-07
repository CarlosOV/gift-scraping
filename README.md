# Gift Web Scraping
Web Scraping of a web of gift recommendation

## Instructions

Run Dev Container

Start Flask

## Folder Structure

app/
├── application/
│   ├── __init__.py
│   ├── notification_use_cases.py
│   ├── product_catalog_use_cases.py
│   └── interfaces/
│       ├── __init__.py
│       ├── notification_port.py
│       ├── product_catalog_port.py
│       └── scraping_port.py
├── domain/
│   ├── __init__.py
│   └── product.py
└── infrastructure/
    ├── __init__.py
    ├── email_notification_adapter.py
    ├── product_catalog_adapter.py
    └── scraping_adapter.py
