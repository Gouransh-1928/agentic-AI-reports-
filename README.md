# agentic-AI-reports-
everyday tasks report

problem 1
Two linked lists represent two numbers.
Each node contains one digit.
The digits are stored in reverse order.
Add the two numbers and return the result as a linked list.

Approach
Traverse both linked lists together.
Add the digits at the current nodes.
Keep track of carry.
Create a new node for each result digit.
Continue until both lists and carry are finished.

Problem 2: Two Sum

Given an array of numbers and a target value, find the indices of the two numbers whose sum equals the target.

Approach
Use two loops.
Pick one number at a time.
Compare it with every number after it.
If the sum equals the target, return their indices.

Problem 3:Roman Numeral to Integer (Recursion)

Given a Roman numeral string, convert it into an integer.

Roman Numerals
Symbol	Value
I	1
V	5
X	10
L	50
C	100
D	500
M	1000
Special Cases

Roman numerals use subtraction in the following cases:

IV = 4
IX = 9
XL = 40
XC = 90
CD = 400
CM = 900
Approach
Create a dictionary to store Roman numeral values.
Use a recursive function solve(i) where i is the current index.
If the current numeral is smaller than the next numeral, it is a special case:
Calculate the difference.
Move forward by 2 positions (i + 2).
Otherwise:
Add the current numeral value.
Move forward by 1 position (i + 1).
Stop recursion when the index reaches the end of the string.
