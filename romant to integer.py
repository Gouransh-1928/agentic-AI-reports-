class Solution:
    def romanToInt(self, s: str) -> int:
        values = {
            'I': 1,
            'V': 5,
            'X': 10,
            'L': 50,
            'C': 100,
            'D': 500,
            'M': 1000
        }

        def solve(i):
            # Base case
            if i >= len(s):
                return 0

            # Special cases (IV, IX, XL, XC, CD, CM)
            if i + 1 < len(s) and values[s[i]] < values[s[i + 1]]:
                return values[s[i + 1]] - values[s[i]] + solve(i + 2)

            # Normal case
            return values[s[i]] + solve(i + 1)

        return solve(0)

# Example
obj = Solution()

print(obj.romanToInt("III"))      # 3
print(obj.romanToInt("IV"))       # 4
print(obj.romanToInt("IX"))       # 9
print(obj.romanToInt("LVIII"))    # 58
print(obj.romanToInt("MCMXCIV"))  # 1994

