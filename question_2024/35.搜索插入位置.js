/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 这道题可以使用二分法
var searchInsert = function (nums, target) {
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
    // 不太明白为什么是right + 1
    return right + 1
};
// @lc code=end

// console.log(searchInsert([1, 3, 5, 6], 5))
// console.log(searchInsert([1, 3, 5, 6], 2))
console.log(searchInsert([1, 3, 5, 6], 7))
// console.log(searchInsert([1, 3], 2))