import os

ROOT_HOST = os.getenv('ROOT_HOST') or 'root'
ROOT_PASS = os.getenv('ROOT_PASS') or 'Vijay1992&' # set your password here
HOST = os.getenv('HOST') or 'localhost'

__all__ = [
    ROOT_HOST,
    ROOT_PASS,
    HOST
]