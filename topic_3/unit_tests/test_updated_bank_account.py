import unittest
from unittest.mock import Mock
from bank_account import BankAccount

class TestBankAccountIntegration(unittest.TestCase):
    def setUp(self):
        self.notification_system = Mock()

    def test_deposit_with_notification(self):
        account = BankAccount(initial_balance=100, notification_system=self.notification_system)
        account.deposit(50)
        self.assertEqual(account.get_balance(), 150)
        self.notification_system.notify.assert_called_once_with("Deposited 50, new balance: 150")
        
if __name__ == '__main__':
    unittest.main()