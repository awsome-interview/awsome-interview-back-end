/*
 * @lc app=leetcode.cn id=515 lang=javascript
 *
 * [515] 在每个树行中找最大值
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function (root) {
  let res = [],
    queue = [];
  queue.push(root);
  if (root === null) {
    return res;
  }
  while (queue.length) {
    let lengthLevel = queue.length,
      // 初始值设为负无穷大
      max = -Infinity;
    while (lengthLevel--) {
      const node = queue.shift();
      //   在当前层中找到最大值
      max = Math.max(max, node.val);
      // 找到下一层的节点
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    res.push(max);
  }
  return res;
};
// @lc code=end
