from typing import Optional
import os
import ssl

from pydantic import BaseSettings


class Settings(BaseSettings):

    DB_IP: str
    DB_NAME: str
    DB_PORT: int
    DB_USERNAME: str
    DB_PASSWORD: str
    DB_SOURCE: str
    ALIAS: str
    BASE_PATH: Optional[str]
    CONNECT_PARAMS: Optional[str]

    class Config:
        env_file = '.env'
        env_file_encoding = 'utf-8'


def get_connect_params(settings):
    connect_dict = dict()
    connect_dict['db'] = settings.DB_NAME
    connect_dict['host'] = settings.DB_IP
    connect_dict['port'] = settings.DB_PORT
    connect_dict['username'] = settings.DB_USERNAME
    connect_dict['password'] = settings.DB_PASSWORD
    connect_dict['authentication_source'] = settings.DB_SOURCE
    connect_dict['alias'] = settings.ALIAS
    connect_dict['ssl'] = True
    connect_dict['ssl_cert_reqs'] = ssl.CERT_NONE
    connect_dict['retrywrites'] = False
    return connect_dict


settings = Settings()
settings.BASE_PATH = os.path.dirname(os.path.abspath('<%=  project %>'))
settings.CONNECT_PARAMS = get_connect_params(settings)
