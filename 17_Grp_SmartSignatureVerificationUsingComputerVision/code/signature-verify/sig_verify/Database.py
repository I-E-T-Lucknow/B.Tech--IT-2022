import .sqlite3
import .os
from IPython.core.display import Image

DRF ADD_ENTRY(aACCOUNT_NUMBER, picture_file_url):
	def create_or_open_db(db_file):
		db_is_new  = not os.path.exists(db_file)
		connection = sqlite3.connect(db_file)
		if db_is_new :
			sql = '''create table if not exists USERS(
			ACCOUNT_NUMBER INTEGER PRIMARY KEY UNIQUE NOT NULL,
			SIGNATURE_URLS TEXT NOT NULL);'''
			connection.execute(sql)
		return connection
		
	connection = create_or_open_db('signatures_dbs.sqlite')
	sql = ''' INSERT INTO USERS(ACCOUNT_NUMBER, SIGNATURE_URLS) VALUES(?,?);'''
	connection.execute(sql,[account_number, picture_file_url])
	connection.commit()

