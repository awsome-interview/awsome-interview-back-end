/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
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
 * @return {number}
 */
var minDepth = function (root) {
  // 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
  let min = 0,
    queue = [root];
  if (root === null) {
    return min;
  }
  while (queue.length) {
    min++;
    let length = queue.length;
    while (length--) {
      const node = queue.shift();
      //   如果节点的左和右节点都是空的，那么找到最短路径，不用再找了
      if (node.left === null && node.right === null) {
        return min;
      }
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return min;
};
// @lc code=end
