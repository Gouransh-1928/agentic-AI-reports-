import asyncio

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:

    async def get_value(self, node):
        return node.val

    async def mergeTwoLists(self, list1, list2):
        dummy = ListNode(0)
        curr = dummy

        while list1 and list2:

            v1, v2 = await asyncio.gather(
                self.get_value(list1),
                self.get_value(list2)
            )

            if v1 <= v2:
                curr.next = list1
                list1 = list1.next
            else:
                curr.next = list2
                list2 = list2.next

            curr = curr.next

        curr.next = list1 or list2

        return dummy.next


def print_list(head):
    while head:
        print(head.val, end=" -> ")
        head = head.next
    print("None")


async def main():
 asyncio.run(main())

#list1 = ListNode(1)
#list1.next = ListNode(2)
#list1.next.next = ListNode(4)

#list2 = ListNode(1)
#list2.next = ListNode(3)
#list2.next.next = ListNode(4)

#obj = Solution()

#result = await obj.mergeTwoLists(list1, list2)

#print_list(result)


 asyncio.run(main())