/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
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
var levelOrder = function (root) {
  let res = [],
    queue = [];
  if (root === null) {
    return res;
  }
  queue.push(root);
  while (queue.length !== 0) {
    // 记录当前层级节点数
    let length = queue.length,
      // 存放每一层的节点
      currentQue = [];
    while (length--) {
      let node = queue.shift();
      currentQue.push(node.val);
      //    存放当前层下一层的节点
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    // 把每一层的结果放到结果数组
    res.push(currentQue);
  }
  return res;
};
// @lc code=end
