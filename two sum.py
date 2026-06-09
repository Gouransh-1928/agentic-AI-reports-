def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]

nums = [14, 11, 58, 78]
target = 69

result = twoSum(nums, target)
print(result)
