from dynaconf import Dynaconf

settings = Dynaconf(
    settings_files = [
        'configs/settings.toml',
        'configs/.secrets.toml',
    ],
    environments = False,
    load_dotenv = False
)