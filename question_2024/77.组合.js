/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  // 一：非剪枝

  // // 回溯法
  // let result = [],
  //   path = [];
  // let backtracking = (_n, _k, startIndex) => {
  //   // 终止条件
  //   if (path.length === _k) {
  //     result.push(path.slice());
  //     return;
  //   }
  //   // 循环本层集合元素
  //   for (let i = startIndex; i <= _n; i++) {
  //     path.push(i);
  //     //   递归
  //     backtracking(_n, _k, i + 1);
  //     //   回溯操作
  //     path.pop();
  //   }
  // };
  // backtracking(n, k, 1);
  // return result;

  // 二：剪枝
  // 回溯法
  let result = [],
    path = [];
  let backtracking = (_n, _k, startIndex) => {
    // 终止条件
    if (path.length === _k) {
      result.push(path.slice());
      return;
    }
    // 循环本层集合元素
    for (let i = startIndex; i <= _n - (_k - path.length) + 1; i++) {
      path.push(i);
      //   递归
      backtracking(_n, _k, i + 1);
      //   回溯操作
      path.pop();
    }
  };
  backtracking(n, k, 1);
  return result;
};
// @lc code=end
console.log(combine(4, 2));
