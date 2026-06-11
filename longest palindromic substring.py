def longestPalindrome(s: str) -> str:
    longest = ""

    for i in range(len(s)):
        left = right = i
        try:
            while s[left] == s[right]:
                if len(s[left:right + 1]) > len(longest):
                    longest = s[left:right + 1]
                left -= 1
                right += 1
        except:
            pass

        left, right = i, i + 1
        try:
            while s[left] == s[right]:
                if len(s[left:right + 1]) > len(longest):
                    longest = s[left:right + 1]
                left -= 1
                right += 1
        except:
            pass

    return longest
#example

s = "babad"
print(longestPalindrome(s))