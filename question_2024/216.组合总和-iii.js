/*
 * @lc app=leetcode.cn id=216 lang=javascript
 *
 * [216] 组合总和 III
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  // 回溯法
  let result = [],
    path = [];
  const backtracking = (_k, targetSum, sum, startIndex) => {
    if (sum > targetSum) {
      return;
    }
    // 终止条件
    if (path.length === _k) {
      if (sum === targetSum) {
        result.push(path.slice());
      }
      // 如果总和不相等，就直接返回
      return;
    }

    // 循环当前节点，因为只使用数字1到9，所以最大是9
    for (let i = startIndex; i <= 9 - (_k - path.length) + 1; i++) {
      path.push(i);
      sum += i;
      // 回调函数
      backtracking(_k, targetSum, sum, i + 1);
      // 回溯
      sum -= i;
      path.pop();
    }
  };
  backtracking(k, n, 0, 1);
  return result;
};
// @lc code=end
console.log(combinationSum3(3, 9));
