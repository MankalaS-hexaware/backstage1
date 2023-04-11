import mongoengine

from core.settings import settings
mongoengine.disconnect(alias=settings.ALIAS)

def get_db():
    
    conn = mongoengine.connect(**settings.CONNECT_PARAMS)
    return conn
