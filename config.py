from dynaconf import Dynaconf

settings = Dynaconf(
    settings_files = [
        'configs/settings.toml',
        'configs/.secrets.toml',
    ],
    environments = True,
    load_dotenv = False
)