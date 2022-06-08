import PyQt6.QtGui

import src.clientService
from src.formUi import LoginForm

from PyQt6 import QtWidgets
from src import error


class LoginWindow(QtWidgets.QMainWindow, LoginForm.Ui_win_login):
    def __init__(self, login_service: src.clientService.ClientService, parent=None):
        super().__init__(parent)
        self._client_service = login_service
        self.setupUi(self)

    def on_login(self):
        login = self.te_login.placeholderText()
        if login == '':
            # show alert that password must not be empty
            pass

        password = self.te_pass.placeholderText()
        if password == '':
            # show alert that password must not be empty
            pass

        try:
            client = self._client_service.login(login, password)
        except error.UseNotFoundException:
            # show alert that password must not be empty
            pass
        except error.WrongPasswordException:
            # show alert that password must not be empty
            pass

