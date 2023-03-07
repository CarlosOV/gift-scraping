from dataclasses import dataclass

@dataclass
class Product:
    name: str
    asin: str
    detail_page: str
    image_url: str
    display_amount: str

    def to_dict(self):
        return {
            'name': self.name,
            'asin': self.asin,
            'detail_page': self.detail_page,
            'image_url': self.image_url,
            'display_amount': self.display_amount
        }