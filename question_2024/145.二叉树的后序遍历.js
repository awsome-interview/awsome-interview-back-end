/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
var postorderTraversal = function (root) {
//   // 第一种
//   let res = [];
//   const dfs = (_root) => {
//     if (_root === null) return;
//     dfs(_root.left);
//     dfs(_root.right);
//     res.push(_root.val);
//     return res;
//   };
//   dfs(root);
//   return res;
  // 第二种
  // 后续遍历：左右中
  return root
    ? [
        // 递归左子树
        ...postorderTraversal(root.left),
        // 递归右子树
        ...postorderTraversal(root.right),
        root.val,
      ]
    : [];
};
// @lc code=end
