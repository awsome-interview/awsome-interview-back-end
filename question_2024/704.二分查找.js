/*
 * @lc app=leetcode.cn id=704 lang=javascript
 *
 * [704] 二分查找
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 暴力求解
// var search = function (nums, target) {
//     let length = nums.length
//     for (let i = 0; i < length; i++) {
//         if (nums[i] === target) {
//             return i
//         }
//     }
//     return -1
// };
// 二分法
var search = function (nums, target) {
    let right = nums.length, left = 0
    // 左闭右闭区间
    while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        if (nums[mid] === target) {
            return mid
        } else if (nums[mid] > target) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    return -1
};
// @lc code=end

// console.log(search([-1, 0, 3, 5, 9, 12], 9))
console.log(search([-1, 0, 3, 5, 9, 12], 2))