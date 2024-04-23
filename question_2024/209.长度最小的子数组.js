/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  // 滑动窗口（双指针变异版本）
  let i = 0,
    res = Infinity,
    subLen = 0,
    sum = 0;
  for (j = 0; j < nums.length; j++) {
    sum += nums[j];
    while (sum >= target) {
      subLen = j - i + 1;
      res = Math.min(res, subLen);
      sum -= nums[i];
      i++;
    }
  }
  return res === Infinity ? 0 : res;
};
// @lc code=end

// console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
console.log(minSubArrayLen(15, [1, 2, 3, 4, 5]));
// console.log(minSubArrayLen(4, [1,4,4]));
// console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]));
