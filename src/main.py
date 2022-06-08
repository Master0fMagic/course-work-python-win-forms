import sys
from PyQt6 import QtWidgets, uic

from window.LoginWindow import LoginWindow

def test():
    app = QtWidgets.QApplication(sys.argv)

    window = LoginWindow()
    window.show()
    app.exec()


if __name__ == '__main__':
    test()
