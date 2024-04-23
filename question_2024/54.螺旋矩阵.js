/*
 * @lc app=leetcode.cn id=54 lang=javascript
 *
 * [54] 螺旋矩阵
 * 难点在于不是正方形
 * 因为他是长方形，所以可以定义4个边界
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  // 左边右开区间
  let res = [],
    left = 0,
    // 实际长度 -1
    right = matrix[0].length - 1,
    top = 0,
    // 实际长度-1
    bottom = matrix.length - 1;
  while (bottom > top && right > left) {
    // 遍历上面
    for (let i = left; i < right; i++) {
      res.push(matrix[top][i]);
    }

    // 遍历右边
    for (let i = top; i < bottom; i++) {
      res.push(matrix[i][right]);
    }
    // 遍历下面
    for (let i = right; i > left; i--) {
      res.push(matrix[bottom][i]);
    }
    // 遍历左边
    for (let i = bottom; i > top; i--) {
      res.push(matrix[i][left]);
    }
    // 四个边界同时收缩，进入内层
    top++;
    bottom--;
    left++;
    right--;
  }
  // 如果是只剩下行，从左到右填充
  if (top === bottom) {
    for (let i = left; i <= right; i++) {
      res.push(matrix[top][i]);
    }
  }
  // 如果是只剩下列，从上到下填充
  else if (left === right) {
    for (let i = top; i <= bottom; i++) {
      res.push(matrix[i][left]);
    }
  }

  return res;
};
// @lc code=end
console.log(spiralOrder([[3], [2]]));
// console.log(
//   spiralOrder([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ])
// );

// console.log(
//   spiralOrder([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//   ])
// );
