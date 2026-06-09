# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def addTwoNumbers(self, l1, l2):
        dummy = ListNode()
        current = dummy

        carry = 0

        while l1 or l2 or carry:

            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0

            total = val1 + val2 + carry

            carry = total // 10
            digit = total % 10

            current.next = ListNode(digit)

            current = current.next

            if l1:
                l1 = l1.next

            if l2:
                l2 = l2.next

        return dummy.next

        #example
# l1 = [3,6,5]
# l2 = [2,6,3]

#l1 = ListNode(5)
#l1.next = ListNode(6)
#l1.next.next = ListNode(3)

#l2 = ListNode(3)
#l2.next = ListNode(6)
#l2.next.next = ListNode(2)

#result = Solution().addTwoNumbers(l1, l2)

#while result:
 #   print(result.val, end=" ")
  #  result = result.next
