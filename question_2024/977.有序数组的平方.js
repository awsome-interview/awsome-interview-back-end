/*
 * @lc app=leetcode.cn id=977 lang=javascript
 *
 * [977] 有序数组的平方
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 暴力解法
// var sortedSquares = function (nums) {
//   let res = [];
//   for (let i = 0; i < nums.length; i++) {
//     res.push(nums[i] * nums[i]);
//   }
//   return res.sort((a, b) => a - b);
// };
// 双指针法
var sortedSquares = function (nums) {
  let k = nums.length - 1,
    res = [];
  for (let i = 0, j = nums.length - 1; i <= j; ) {
    if (nums[i] * nums[i] < nums[j] * nums[j]) {
      res[k--] = nums[j] * nums[j];
      j--;
    } else {
      res[k--] = nums[i] * nums[i];
      i++;
    }
  }
  return res;
};
// @lc code=end

// console.log(sortedSquares([-4, -1, 0, 3, 10]));
console.log(sortedSquares([-7, -3, 2, 3, 11]));
