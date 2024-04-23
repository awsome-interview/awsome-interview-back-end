/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
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
var swapPairs = function (head) {
  // 创建哨兵节点
  let dummyNode = new ListNode(0, head);
  let node0 = dummyNode;
  let node1 = head;

  // 定义0，1，2，3节点

  // 循环
  while (node1 && node1.next) {
    let node2 = node1.next;
    let node3 = node2.next;
    // 交换相邻节点
    node0.next = node2;
    node2.next = node1;
    node1.next = node3;
    // 更新0，1节点
    node0 = node1;
    node1 = node3;
  }
  return dummyNode.next;
};
// @lc code=end
