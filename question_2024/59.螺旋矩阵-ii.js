/*
 * @lc app=leetcode.cn id=59 lang=typescript
 *
 * [59] 螺旋矩阵 II
 * 左闭右开区间
 */
// @lc code=start
function generateMatrix(n) {
  let res = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let i = 0,
    j = 0,
    startX = 0,
    startY = 0,
    offset = 1,
    count = 1,
    // 旋转次数
    loop = Math.floor(n / 2),
    // 中间位置
    mid = Math.floor(n / 2);
  while (loop--) {
    // 填充上方
    for (j = startY; j < n - offset; j++) {
      // 必须是startX，不能是i，如果遍历第二圈，是i的话，i=0
      res[startX][j] = count++;
    }
    // 填充右边
    for (i = startX; i < n - offset; i++) {
      res[i][j] = count++;
    }
    // 填充下面,j不用重新赋值，已经是最右下角的最大值
    for (; j > startY; j--) {
      res[i][j] = count++;
    }
    // 填充左边
    for (; i > startX; i--) {
      res[i][j] = count++;
    }
    startX++;
    startY++;
    offset++;
  }
  // 要脱离循环，如果是奇数，中间插入值，结束，不用遍历
  if (n % 2 === 1) {
    res[mid][mid] = count;
  }
  return res;
}
// @lc code=end
// console.log(generateMatrix(3));
console.log(generateMatrix(4));
// console.log(generateMatrix(1));
