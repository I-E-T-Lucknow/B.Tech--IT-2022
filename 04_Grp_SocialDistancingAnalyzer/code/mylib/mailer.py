# import smtplib, ssl

# class Mailer:

#     """
#     This script initiaties the email alert function.
#     """
#     def __init__(self):
#         # Enter your email below. This email will be used to send alerts.
#         # E.g., "email@gmail.com"
#         self.EMAIL = "swarnimky88@gmail.com"
#         # Enter the email password below. Note that the password varies if you have secured
#         # 2 step verification turned on. You can refer the links below and create an application specific password.
#         # Google mail has a guide here: https://myaccount.google.com/lesssecureapps
#         # For 2 step verified accounts: https://support.google.com/accounts/answer/185833
#         # Example: aoiwhdoaldmwopau
#         self.PASS = ""
#         self.PORT = 465
#         self.server = smtplib.SMTP_SSL('swarnimky88.gmail.com', self.PORT)

#     def send(self, mail):
#         self.server = smtplib.SMTP_SSL('swarnimky88@gmail.com', self.PORT)
#         self.server.login(self.EMAIL, self.PASS)
#         # message to be sent
#         SUBJECT = 'ALERT!'
#         TEXT = f'Social distancing violations exceeded!'
#         message = 'Subject: {}\n\n{}'.format(SUBJECT, TEXT)

#         # sending the mail
#         self.server.sendmail(self.EMAIL, mail, message)
#         self.server.quit()

import smtplib
class Mailer:
    def __init__(self):
        server = smtplib.SMTP()
        server._host = "smtp.gmail.com"
        server.connect("smtp.gmail.com",587)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(secretKey.MY_MAIL_ADDRESS , secretKey.MY_MAIL_PASSWORD)
    
        textMsg = "Dear " + name +",\n\n"+ "We have detected violation of social distancing norms"
        SUBJECT = "Warning regarding COVID-19"
        message = 'Subject: {}\n\n{}'.format(SUBJECT, textMsg)
        server.sendmail(secretKey.MY_MAIL_ADDRESS, mail , message)

        
        
        