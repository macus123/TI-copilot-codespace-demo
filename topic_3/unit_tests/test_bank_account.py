import unittest
from bank_account import BankAccount

class TestBankAccount(unittest.TestCase):
    def setUp(self):
        self.account = BankAccount()

    def test_initial_balance(self):
        self.assertEqual(self.account.get_balance(), 0)

    def test_deposit_positive_amount(self):
        self.account.deposit(100)
        self.assertEqual(self.account.get_balance(), 100)

    def test_withdraw_within_balance(self):
        self.account.deposit(100)
        self.account.withdraw(50)
        self.assertEqual(self.account.get_balance(), 50)

    def test_deposit_negative_amount_raises_error(self):
        with self.assertRaises(ValueError):
            self.account.deposit(-100)

    def test_withdraw_negative_amount_raises_error(self):
        with self.assertRaises(ValueError):
            self.account.withdraw(-50)

    def test_withdraw_more_than_balance_raises_error(self):
        self.account.deposit(100)
        with self.assertRaises(ValueError):
            self.account.withdraw(200)

    def test_initial_balance_negative_raises_error(self):
        with self.assertRaises(ValueError):
            BankAccount(-100)

if __name__ == '__main__':
    unittest.main()
    # to run the script using the unittest library, use python -m unittest test_bank_account.py

