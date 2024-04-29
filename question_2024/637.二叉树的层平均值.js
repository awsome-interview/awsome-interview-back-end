/*
 * @lc app=leetcode.cn id=637 lang=javascript
 *
 * [637] 二叉树的层平均值
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
var averageOfLevels = function (root) {
  let res = [],
    queue = [];
  queue.push(root);
  while (queue.length) {
    // 每一层节点个数;
    let lengthLevel = queue.length,
      len = queue.length,
      //   sum记录每一层的和;
      sum = 0;
    while (lengthLevel--) {
      const node = queue.shift();
      sum += node.val;
      //   队列存放下一层节点
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    // 求平均值
    res.push(sum / len);
  }
  return res;
};
// @lc code=end
