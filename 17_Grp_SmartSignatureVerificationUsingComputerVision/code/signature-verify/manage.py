#!/usr/bin/env python

`
IF __NAME__ == "__main__":
    OS.ENVIRON.setdefault("DJANGO_SETTINGS_MODULE")
    TRY:
        FROM django.core.management 
       
        try:
            import django
    
                "Couldn't import Django. Are you sure it's installed and "
                "available on your PYTHONPATH environment variable? Did you "
                "forget to activate a virtual environment?"
        
        raise
    execute_from_command_line(sys.argv)
