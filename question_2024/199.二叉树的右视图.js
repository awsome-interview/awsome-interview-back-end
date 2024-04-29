/*
 * @lc app=leetcode.cn id=199 lang=javascript
 *
 * [199] 二叉树的右视图
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
var rightSideView = function (root) {
  let res = [],
    queue = [];
  if (root === null) {
    return res;
  }
  queue.push(root);
  while (queue.length !== 0) {
    let lengthLevel = queue.length;
    while (lengthLevel--) {
      let node = queue.shift();
      //   如果当前层长度为0，那么就是最后一个元素
      lengthLevel === 0 && res.push(node.val);
      //   找到下一层的所有元素
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return res;
};
// @lc code=end
