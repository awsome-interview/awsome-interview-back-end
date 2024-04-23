/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let temp = null,
    pre = null,
    cur = head;
  while (cur) {
    // 下个节点缓存
    temp = cur.next;
    // 当前节点指向上个节点
    cur.next = pre;
    //重新循环： 当前节点变成了上个节点
    pre = cur;
    //重新循环： 下个节点变成了当前节点
    cur = temp;
  }
  return pre;
};
// @lc code=end
