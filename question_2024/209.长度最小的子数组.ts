/*
 * @lc app=leetcode.cn id=209 lang=typescript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
function minSubArrayLen(target: number, nums: number[]): number {
  let left: number = 0,
    res: number = Infinity,
    subLen: number = 0,
    sum: number = 0;
  for (let right: number = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      subLen = right - left + 1;
      res = Math.min(res, subLen);
      sum -= nums[left];
      left++;
    }
  }
  return res === Infinity ? 0 : res;
}
// @lc code=end
