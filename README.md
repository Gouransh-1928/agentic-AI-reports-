# agentic-AI-reports-
everyday tasks report

## ***(D1)problem 1 - sum***

Two linked lists represent two numbers.
Each node contains one digit.
The digits are stored in reverse order.
Add the two numbers and return the result as a linked list.

**Approach**

1.Traverse both linked lists together.
2.Add the digits at the current nodes.
3.Keep track of carry.
4.Create a new node for each result digit.
5.Continue until both lists and carry are finished.

## _**(D1)Problem 2: Two Sum**_

Given an array of numbers and a target value, find the indices of the two numbers whose sum equals the target.

 **Approach**
 
Use two loops.
Pick one number at a time.
Compare it with every number after it.
If the sum equals the target, return their indices.


 ##  _**(D2)Problem 3:Roman Numeral to Integer (Recursion)**_

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

**Approach**

Create a dictionary to store Roman numeral values.
Use a recursive function solve(i) where i is the current index.
If the current numeral is smaller than the next numeral, it is a special case:
Calculate the difference.
Move forward by 2 positions (i + 2).
Otherwise:
Add the current numeral value.
Move forward by 1 position (i + 1).
Stop recursion when the index reaches the end of the string.

## _**(D3)problem 4 -  Longest Palindromic Substring**_

Given a string `s`, return the longest palindromic substring in `s`.

 **Approach**

This solution uses the **Expand Around Center** technique.

For every character in the string:

1. Treat it as the center of an odd-length palindrome.
2. Treat it and the next character as the center of an even-length palindrome.
3. Expand outward while the characters match.
4. Keep track of the longest palindrome found.

**Algorithm**

1. Initialize an empty string `longest`.
2. Loop through each character in the string.
3. Check for odd-length palindromes.
4. Check for even-length palindromes.
5. Update `longest` whenever a larger palindrome is found.
6. Return `longest`.
Example 
Input:
s = "babad"
Output:
"bab"

## **_(D4)problem 5:Longest Common Prefix_**
Write a function to find the longest common prefix string among an array of strings. 
If there is no common prefix, return an empty string "".

Example

Input:

["flower", "flow", "flight"]

Output:

"fl"

**Approach**

Take the first word as the initial prefix.
Compare it with every other word.
If a word does not start with the current prefix, remove the last character from the prefix.
Continue until all words share the same prefix.
If the prefix becomes empty, return "".

## _**(D4)problme 6: Container With Most Water**_
You are given an integer array height.

Find two lines that together with the x-axis form a container such that the container stores the maximum amount of water.
Return the maximum amount of water the container can store.

 **Approach**

Use the Two Pointer technique.

Place one pointer at the beginning of the array.
Place another pointer at the end.
Calculate the area formed by the two lines.
Move the pointer pointing to the smaller height.
Keep track of the maximum area found.

The area is calculated as:

Area = Width × Minimum Height


