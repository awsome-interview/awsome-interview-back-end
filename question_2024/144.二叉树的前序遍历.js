/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
var preorderTraversal = function (root) {
  // 使用递归，中左右
  // 第一种
  //   let res = [];
  //   const dfs = (_root) => {
  //     if (_root === null) return;
  //     res.push(_root.val);
  //     if (_root.left) dfs(_root.left);
  //     if (_root.right) dfs(_root.right);
  //     return res;
  //   };
  //   dfs(root);
  //   return res;
  // 第二种
  return root
    ? [
        root.val,
        ...preorderTraversal(root.left),
        ...preorderTraversal(root.right),
      ]
    : [];
};
// @lc code=end
