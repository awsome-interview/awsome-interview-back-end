/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 二分法
// 1、首先，在 nums 数组中二分查找 target；
// 2、如果二分查找失败，则 binarySearch 返回 -1，表明 nums 中没有 target。此时，searchRange 直接返回 {-1, -1}；
// 3、如果二分查找成功，则 binarySearch 返回 nums 中值为 target 的一个下标。然后，通过左右滑动指针，来找到符合题意的区间
const binarySearch = (nums, target) => {
    let left = 0, right = nums.length - 1, mid
    while (left <= right) {
        mid = Math.floor((left + right) / 2)
        if (nums[mid] > target) {
            right = mid - 1
        } else if (nums[mid] < target) {
            left = mid + 1
        } else {
            return mid
        }
    }
    return -1
}
var searchRange = function (nums, target) {
    const index = binarySearch(nums, target)
    if (index === -1) return [-1, -1]
    let left = index, right = index
    // 查找左边，找到第一个元素，因为left直接就能找到，所以往前进一位判断
    while (left > -1 && nums[left - 1] === target) {
        left--
    }
    // 查找右边，找到最后一个元素
    while (right < nums.length - 1 && nums[right + 1] === target) {
        right++
    }
    return [left, right]
};
// @lc code=end
console.log(searchRange([5, 7, 7, 8, 8, 10], 8))
// console.log(searchRange([5, 7, 7, 8, 8, 10], 6))
// console.log(searchRange([], 0))
