from dataclasses import dataclass

@dataclass
class Category: 
    description: str

    def to_dict(self):
        return {
            'description': self.description
        }