import json
import traceback
import pandas as pd


def objects_to_df(objects, exclude: list = None) -> pd.DataFrame:
    '''
    Convert Mongo Objects to pandas dataframe
    '''
    df = pd.DataFrame()
    try:
        out = []
        for _object in objects:
            object_dict = json.loads(_object.to_json())
            if exclude:
                object_dict = filter_dict(object_dict, 'exclude', *exclude)

            out.append(object_dict)

        df = pd.DataFrame(out)
    except:
        print(traceback.format_exc())

    return df


def filter_dict(data: dict, function: str, *args):
    '''
    Used to filter dict and return only required

    Parameter
    --------
    data : dict 
        Dict to be filtered
    function : str
        Type of filter include or exclude
    args : str
        All the values
    '''
    # try:
    exclude_values = list()
    if function == 'include':
        exclude_values = [key for key in data if key not in args]
    else:
        exclude_values = args

    for value in exclude_values:
        del data[value]

    return data
