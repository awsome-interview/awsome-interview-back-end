/*
 * @lc app=leetcode.cn id=107 lang=javascript
 *
 * [107] 二叉树的层序遍历 II
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
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  let res = [],
    queue = [];
  if (root === null) {
    return res;
  }
  queue.push(root);
  while (queue.length !== 0) {
    let currentLevel = [],
      lengthLevel = queue.length;
    while (lengthLevel--) {
      // 放入每一层的值
      let node = queue.shift();
      currentLevel.push(node.val);
      //   将下一层的值放入队列中
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    res.unshift(currentLevel);
  }
  return res;
};
// @lc code=end
