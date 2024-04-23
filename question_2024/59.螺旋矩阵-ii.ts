/*
 * @lc app=leetcode.cn id=59 lang=typescript
 *
 * [59] 螺旋矩阵 II
 * 左闭右开区间
 */

// @lc code=start
function generateMatrix(n: number): number[][] {
  let res: number[][] = [];
  let i = 0,
    j = 0,
    startX = 0,
    startY = 0,
    offset = 1,
    count = 1;
  while (n / 2) {
    // 填充上方
    for (j = startY; j < n - offset; j++) {
      res[i][j] = count++;
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

    if (n % 2 === 1) {
      res[i][j] = count;
    }
  }
  return res;
}
// @lc code=end

console.log(generateMatrix(3));
// console.log(generateMatrix(1))
