import traceback
import traceback
import logging
from typing import List
from pydantic import BaseModel
logger = logging.getLogger()


def convert_dict_to_model(list_of_dicts: List[dict],
                          RowModel: BaseModel,
                          Schema: BaseModel = None):
    '''
    Will convert list of dicts to model schema

    Parameters
    ----------
    list_of_dicts : List[dict]
        Data in List of dict format
    RowModel : BaseModel
        Model for each row
    Schema : BaseModel
        Output model Schema
    '''
    try:
        out = list()
        for row in list_of_dicts:
            row_model = RowModel(**row)
            out.append(row_model)
        if not Schema:
            model_out = out
        else:
            model_out = Schema(out=out)
    except:
        print(traceback.format_exc())
        logger.error(traceback.format_exc())
        model_out = Schema
    finally:
        return model_out
