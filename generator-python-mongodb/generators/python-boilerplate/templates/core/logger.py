import logging
import os
import time
import warnings

from core.settings import settings


def config_logger():
    '''
    configure logger

    '''
    warnings.filterwarnings('error', category=UnicodeWarning)
    if not os.path.exists(os.path.join(settings.BASE_PATH, 'logs')):
        os.mkdir(os.path.join(settings.BASE_PATH, 'logs'))
    logs_storage = os.path.join(settings.BASE_PATH, 'logs', '<%=  project %>.log')
    logging.getLogger('schedule').propagate = False
    logger = logging.getLogger()
    formatter = logging.Formatter(
        '%(asctime)s %(name)s %(levelname)s %(message)s')
    logging.Formatter.converter = time.localtime
    # use very short interval for this example, typical 'when' would be 'midnight' and no explicit interval
    handler = logging.handlers.TimedRotatingFileHandler(
        logs_storage, when="midnight", interval=1, backupCount=10)
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.setLevel(logging.INFO)

    return logger


logger = config_logger()
