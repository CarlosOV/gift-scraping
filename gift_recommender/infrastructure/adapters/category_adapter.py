import requests
import urllib3
import sseclient
import json
from config import settings

import config
from gift_recommender.domain.category import Category
from gift_recommender.application.ports.category_port import CategoryPort

class CategoryAdapter(CategoryPort):
    def get_categories_by_statement(self, statement: str) -> list[Category]:
        scraping_category_url = f'{settings.scraping_web_url}{settings.category_path}'
        http = urllib3.PoolManager()
        
        response  = http.request('POST', f'{scraping_category_url}?description={statement.replace(" ", "%20")}', preload_content=False)
        # response  = requests.post(f'{scraping_category_url}?description={statement.replace(" ", "%20")}', stream=True)
        response_sse = sseclient.SSEClient(response)
        categories_raw = ""
        for event in response_sse.events():
            if event.data != '[DONE]':
                choice = json.loads(event.data)['choices'][0]['delta']
                for text in choice.values():
                    categories_raw += text
        categories_string = categories_raw.split("\n- ")
        categories = list(map(lambda s: Category(s), categories_string))
        return categories[1:]