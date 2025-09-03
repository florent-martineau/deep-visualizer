from py_pglite.sqlalchemy import SQLAlchemyPGliteManager

manager = SQLAlchemyPGliteManager()
manager.start()
engine = manager.get_engine()